import Image from "next/image";
import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/Layout";
import Pagination from "../../../../components/Pagination";
import { authPageAdmin } from "../../../../middleware/authPage";

export async function getServerSideProps(ctx) {
    const { token } = await authPageAdmin(ctx)
 
    return { props: {token} }
}

export default function BukuIndex({token}) {
    const [formPage, setFormPage] = useState(0)
    const [feild, setFeild] = useState({
        judul: '', pengarang: '', penerbit: '', no_panggil: '', isbn: '',
        bahasa: '', tahun: '', edisi: '', fisik: '', subyek: '',
        desk: ''
    })
    const [buku, setBuku] = useState('')
    const [click, setClick] = useState(false)
    const [file, setFile] = useState(null)
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [rows, setRows] = useState(0)
    const [status, setStatus] = useState('')
    const [addActive, setAddActive] = useState(false)
    const [updateActive, setUpdateActive] = useState(false)
    useEffect(() => {
        getBuku()
    }, [keyword, page, click])
    const getBuku = async () => {
        const req = await fetch(process.env.API_SERVER + `/admin/buku?search_query=${keyword}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        const {data, metadata, totalRows} = await req.json()
        setBuku(data)
        setPage(metadata.page)
        setPages(metadata.totalPage)
        setLimit(metadata.limit)
        setRows(metadata.totalRows)
    }
    // handle button tambah data buku
    function addOnClick() {
        setAddActive(true)
    }
    // handle button batal tambah buku
    function addClose() {
        setFormPage(0)
        setAddActive(false)
    }
    async function editOnClick(id) {
        const req = await fetch(process.env.API_SERVER + `/admin/buku/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        const buku = await req.json()
        setFeild(buku.data)
        setUpdateActive(true)
    }
    function handleSearch(e) {
        e.preventDefault()
        setKeyword(e.target[0].value)
    }
    // handle button simpan tambah data
    async function handleSubmit() {
        let formData = new FormData()
        formData.append("judul", feild.judul)
        formData.append("pengarang", feild.pengarang)
        formData.append("penerbit", feild.penerbit)
        formData.append("no_panggil", feild.no_panggil)
        formData.append("isbn", feild.isbn)
        formData.append("bahasa", feild.bahasa)
        formData.append("tahun", feild.tahun)
        formData.append("edisi", feild.edisi)
        formData.append("fisik", feild.fisik)
        formData.append("kategori", feild.subyek)
        formData.append("cover", file)
        formData.append("desk", feild.desk)
        fetch(process.env.API_SERVER + "/admin/buku/upload", {
            method: "POST",
            headers: {
                'Authorization': "Bearer " + token,
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                setAddActive(false)
                setClick(!click)
                setFormPage(0)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    async function handleSubmitUpdate() {
        let formData = new FormData()
        formData.append("judul", feild.judul)
        formData.append("pengarang", feild.pengarang)
        formData.append("penerbit", feild.penerbit)
        formData.append("no_panggil", feild.no_panggil)
        formData.append("isbn", feild.isbn)
        formData.append("bahasa", feild.bahasa)
        formData.append("tahun", feild.tahun)
        formData.append("edisi", feild.edisi)
        formData.append("fisik", feild.fisik)
        formData.append("kategori", feild.subyek)
        formData.append("cover", file)
        formData.append("desk", feild.desk)
        fetch(process.env.API_SERVER + `/admin/buku/update?id=${feild.id}`, {
            method: "PUT",
            headers: {
                'Authorization': "Bearer " + token,
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                setClick(!click)
                setUpdateActive(false)
                setFormPage(0)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    async function handleDelete(id) {
        await fetch(process.env.API_SERVER + `/admin/buku/delete?id=${id}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
        })
        const bukuFilter = buku.filter((data) => {
            return data.id !== id && data;
        });
        setBuku(bukuFilter);
    }
    function fieldHandler(e) {
        const name = e.target.getAttribute('name')
        setFeild({
            ...feild,
            [name]: e.target.value
        })
    }
    function fileHandler(e) {
        setFile(e.target.files[0])
    }
    return(
        <>
            <AdminLayout>
                <div className={`${addActive || updateActive ? '' : 'hidden'} absolute top-0 left-0 w-screen h-screen bg-black opacity-50 duration-500 ease-out transition-opacity z-10`}></div>
                <div className="screen-bersih overflow-y-scroll srcool-hiden  relative w-full">
                    <div className="flex items-center mb-3 space-x-2">
                        <form onSubmit={(e) => handleSearch(e)} className="w-full">
                            <input type="text" className="input" placeholder="Cari buku berdasarkan judul atau kode panggil..."></input>
                        </form>
                        <button onClick={() => addOnClick()} className="btn text-sm w-auto">Buku</button>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="">
                            <tr className="text-left">
                                <th className="w-[120px] px-4 py-5 text-center bg-white rounded-l-xl">Cover</th>
                                <th className="w-[130px] px-4 py-5 text-center bg-white">Kode Panggil</th>
                                <th className="px-4 py-5 bg-white">Judul</th>
                                <th className="px-4 py-5 bg-white">Pengarang</th>
                                <th className="w-[90px] px-4 py-5 text-center bg-white">Status</th>
                                <th className="w-[130px] mb-5 px-4 py-5 text-center bg-white rounded-r-xl">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr>
                                <td className="py-2"></td>
                                <td className="py-2"></td>
                                <td className="py-2"></td>
                                <td className="py-2"></td>
                                <td className="py-2"></td>
                                <td className="py-2"></td>
                            </tr>
                            {buku.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center">Data buku tidak ada</td>
                                </tr>
                            ) : (
                                buku.map((data, index) => (
                                    <tr className="group hover:bg-gray-100" key={index}>
                                        <td className="p-3"> 
                                            <div className="relative w-[80px] h-10 m-auto group-hover:h-[100px] bg-slate-700 ease-out duration-300 transition-all delay-100">
                                                <Image src={`${process.env.SERVER}/uploads/cover/${data.img_url}`} alt='cover' fill sizes="80px" style={{objectFit: "cover"}} />
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">{data.no_panggil}</td>
                                        <td className="min-w-[180px] max-w-[240px] p-4 truncate">{data.judul}</td>
                                        <td className="max-w-[160px] p-4 truncate">{data.pengarang}</td>
                                        <td className="p-4 text-white">{data.status ? (
                                            <span className="px-3 bg-emerald-500 rounded-full">Tersedia</span>
                                        ) : (
                                                <span className="px-3 bg-red-600 rounded-full">Dipinjam</span>
                                        )}</td>
                                        <td className="p-4 text-center text-xs space-x-1">
                                            <button onClick={() => editOnClick(data.id)} className="btn px-2">Edit</button>
                                            <button onClick={() => handleDelete(data.id)} className="btn-delete px-2">Hapus</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            
                        </tbody>
                    </table>
                </div>
                <div className="absolute flex items-center space-x-8 right-6 bottom-6 mx-4">
                    <div className="">
                        <p className="text-sm"><span className="font-bold">Total buku:</span> {rows}, <span className="font-bold">Page:</span> {page + 1} dari {pages}</p>
                    </div>
                    <div className="flex items-center space-x-3 text-xs">
                        <button disabled={page === 0} onClick={() => setPage(page - 1)} className="btn">Prev</button>
                        <p>{page + 1}</p>
                        <button disabled={page === pages - 1} onClick={() => setPage(page + 1)} className="btn">Next</button>
                    </div>
                </div>
                <div className={`${addActive ? 'right-0': '-right-full'} fixed top-0 h-screen w-[340px] p-4 bg-white space-y-4 z-20 ease-out duration-500 transition-all`}>
                    <h4 className="text-2xl font-bold my-5">📚 Tambah Buku</h4>
                        <form onSubmit={(e) => e.preventDefault(e)}>
                            <section className={`${formPage === 0 ? '' : 'hidden'}`}>
                                <label htmlFor="judul" className="mx-2 text-sm">
                                    Judul Buku
                                </label>
                                <input
                                onChange={fieldHandler.bind(this)}
                                    type="text"
                                    id="judul"
                                    name="judul"
                                    placeholder="Judul Buku..."
                                    className="input"
                                />
                                <label htmlFor="pengarag" className="mx-2 text-sm">
                                    Pengarang
                                </label>
                                <input
                                onChange={fieldHandler.bind(this)}
                                    type="text"
                                    id="pengarang"
                                    name="pengarang"
                                    placeholder="Carol D.Wey ..."
                                    className="input"
                                />
                                <label htmlFor="penerbit" className="mx-2 text-sm">
                                    Penerbit
                                </label>
                                <input
                                onChange={fieldHandler.bind(this)}
                                    type="text"
                                    id="penerbit"
                                    name="penerbit"
                                    placeholder="Elexmedia ..."
                                    className="input"
                                />
                                <label htmlFor="no_panggil" className="mx-2 text-sm">
                                    Kode Panggil
                                </label>
                                <input
                                onChange={fieldHandler.bind(this)}
                                    type="text"
                                    id="no_panggil"
                                    name="no_panggil"
                                    placeholder="223.DR.123"
                                    className="input"
                                />
                                <label htmlFor="isbn" className="mx-2 text-sm">
                                    ISBN
                                </label>
                                <input
                                onChange={fieldHandler.bind(this)}
                                    type="text"
                                    id="isbn"
                                    name="isbn"
                                    placeholder="978-602-8519-93-9"
                                    className="input"
                                />
                            </section>
                        <section className={`${formPage === 1 ? '' : 'hidden'}`}>
                                <label htmlFor="bahasa" className="mx-2 text-sm">
                                    Bahasa
                                </label>
                                <input
                                onChange={fieldHandler.bind(this)}
                                    type="text"
                                    id="bahasa"
                                    name="bahasa"
                                    placeholder="Indonesia"
                                    className="input"
                                />
                                <label htmlFor="tahun" className="mx-2 text-sm">
                                    Tahun Terbit
                                </label>
                                <input
                                onChange={fieldHandler.bind(this)}
                                    type="text"
                                    id="tahun"
                                    name="tahun"
                                    placeholder="2023"
                                    className="input"
                                />
                            <label htmlFor="edisi" className="mx-2 text-sm">
                                Edisi
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="edisi"
                                name="edisi"
                                placeholder="1"
                                className="input"
                            />
                            <label htmlFor="fisik" className="mx-2 text-sm">
                                Deskripsi Fisik
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="fisik"
                                name="fisik"
                                placeholder="24cm, iii, 120 hlm"
                                className="input"
                            />
                            <label htmlFor="subyek" className="mx-2 text-sm">
                                Subyek
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="subyek"
                                name="subyek"
                                placeholder="teknologi"
                                className="input"
                            />
                            </section>
                        <section className={`${formPage === 2 ? '' : 'hidden'}`}>
                            <label htmlFor="cover" className="mx-2 text-sm">
                                Upload cover buku
                            </label>
                            <input
                                onChange={fileHandler.bind(this)}
                                type="file"
                                id="cover"
                                name="cover"
                                className="input mb-4"
                            />
                            <label htmlFor="desk" className="mx-2 text-sm">
                                Deskripsi Buku
                            </label>
                            <textarea
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="desk"
                                name="desk"
                                placeholder="teknologi adalah ..."
                                className="input h-[200px] max-h-[220px]"
                            />
                            </section>
                        
                        </form>
                        <div className="absolute space-y-2 bottom-10 right-4 left-4">
                        <button onClick={() => handleSubmit()} className={`btn w-full ${formPage !== 2 && 'hidden'}`}>Simpan</button>
                        <button onClick={() => setFormPage(formPage + 1)} className={`${formPage === 2 && 'hidden'} btn w-full`}>Selanjutnya</button>
                            <button onClick={() => addClose()} className="btn-delete w-full">Batal</button>
                        </div>
                    </div>
                <div className={`${updateActive ? 'right-0' : '-right-full'} fixed top-0 h-screen w-[340px] p-4 bg-white space-y-4 z-20 ease-out duration-500 transition-all`}>
                    <h4 className="text-2xl font-bold my-5">📚 Update Buku</h4>
                    <form onSubmit={(e) => e.preventDefault(e)}>
                        <section className={`${formPage === 0 ? '' : 'hidden'}`}>
                            <label htmlFor="judul" className="mx-2 text-sm">
                                Judul Buku
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="judul"
                                name="judul"
                                value={feild.judul}
                                placeholder="Judul Buku..."
                                className="input"
                            />
                            <label htmlFor="pengarag" className="mx-2 text-sm">
                                Pengarang
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="pengarang"
                                name="pengarang"
                                value={feild.pengarang}
                                placeholder="Carol D.Wey ..."
                                className="input"
                            />
                            <label htmlFor="penerbit" className="mx-2 text-sm">
                                Penerbit
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="penerbit"
                                name="penerbit"
                                value={feild.penerbit}
                                placeholder="Elexmedia ..."
                                className="input"
                            />
                            <label htmlFor="no_panggil" className="mx-2 text-sm">
                                Kode Panggil
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="no_panggil"
                                name="no_panggil"
                                value={feild.no_panggil}
                                placeholder="223.DR.123"
                                className="input"
                            />
                            <label htmlFor="isbn" className="mx-2 text-sm">
                                ISBN
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="isbn"
                                name="isbn"
                                value={feild.isbn}
                                placeholder="978-602-8519-93-9"
                                className="input"
                            />
                        </section>
                        <section className={`${formPage === 1 ? '' : 'hidden'}`}>
                            <label htmlFor="bahasa" className="mx-2 text-sm">
                                Bahasa
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="bahasa"
                                name="bahasa"
                                value={feild.bahasa}
                                placeholder="Indonesia"
                                className="input"
                            />
                            <label htmlFor="tahun" className="mx-2 text-sm">
                                Tahun Terbit
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="tahun"
                                name="tahun"
                                value={feild.tahun}
                                placeholder="2023"
                                className="input"
                            />
                            <label htmlFor="edisi" className="mx-2 text-sm">
                                Edisi
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="edisi"
                                name="edisi"
                                value={feild.edisi}
                                placeholder="1"
                                className="input"
                            />
                            <label htmlFor="fisik" className="mx-2 text-sm">
                                Deskripsi Fisik
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="fisik"
                                name="fisik"
                                value={feild.fisik}
                                placeholder="24cm, iii, 120 hlm"
                                className="input"
                            />
                            <label htmlFor="subyek" className="mx-2 text-sm">
                                Subyek
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="subyek"
                                name="subyek"
                                value={feild.subyek}
                                placeholder="teknologi"
                                className="input"
                            />
                        </section>
                        <section className={`${formPage === 2 ? '' : 'hidden'}`}>
                            <label htmlFor="cover" className="mx-2 text-sm">
                                Upload cover buku
                            </label>
                            <input
                                onChange={fileHandler.bind(this)}
                                type="file"
                                id="cover"
                                name="cover"
                                className="input mb-4"
                            />
                            <label htmlFor="desk" className="mx-2 text-sm">
                                Deskripsi Buku
                            </label>
                            <textarea
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="desk"
                                name="desk"
                                value={feild.desk}
                                placeholder="teknologi adalah ..."
                                className="input h-[200px] max-h-[220px]"
                            />
                        </section>

                    </form>
                    <Pagination rows={rows} page={page} pages={pages} />
                </div>
            </AdminLayout>
        </>
    )
}