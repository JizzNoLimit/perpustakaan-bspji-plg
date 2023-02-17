import Image from "next/image";
import { useEffect, useState } from "react";
import Countdown from "../../../../components/Countdown";
import AdminLayout from "../../../../components/Layout";
import Pagination from "../../../../components/Pagination";
import { authPageAdmin } from "../../../../middleware/authPage";

export async function getServerSideProps(ctx) {
    const { token } = await authPageAdmin(ctx)
    return { props: { token } }
}

export default function PinjamIndex({ token }) {
    const [pinjam, setPinjam] = useState('')
    const [click, setClick] = useState(false)
    const [feild, setFeild] = useState('')
    const [addActive, setAddActive] = useState(false)
    const [updateActive, setUpdateActive] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [rows, setRows] = useState(0)
    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        getPinjam()
    }, [keyword, page, click])
    async function getPinjam() {
        const req = await fetch(process.env.API_SERVER + `/admin/kembali?search_query=${keyword}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token,
            }
        })
        const { data, metadata, message } = await req.json()
        setPinjam(data)
        setPage(metadata.page)
        setPages(metadata.totalPage)
        setLimit(metadata.limit)
        setRows(metadata.totalRows)
    }
    const handleSubmit = async () => {
        fetch(process.env.API_SERVER + "/admin/pinjam", {
            method: "POST",
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feild),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status !== 200) setAlert(true)
                setMessage(data.message)
                setClick(!click)
                setAddActive(false)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    async function editOnClick(id) {
        const req = await fetch(process.env.API_SERVER + `/admin/pinjam/${id}`, {
            method: 'GET',
            headers: { Authorization: "Bearer " + token },
        })
        const pinjam = await req.json()
        setFeild(pinjam.data)
        setUpdateActive(true)
    }
    async function handleDelete(id, bukuId) {
        await fetch(process.env.API_SERVER + `/admin/pinjam/delete?id=${id}&bukuId=${bukuId}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
        })
        const pinjamFilter = pinjam.filter((data) => {
            return data.id !== id && data;
        });
        setClick(!click)
        setPinjam(pinjamFilter);
    }
    function fieldHandler(e) {
        const name = e.target.getAttribute('name')
        setFeild({
            ...feild,
            [name]: e.target.value
        })
    }
    // Handle pencarian anggota
    function handleSearch(e) {
        e.preventDefault()
        setKeyword(e.target[0].value)
    }
    function converDate(dd, mm, yy) {
        const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

        return (
            <span className="text-sm">{dd} {bulan[mm]} {yy}</span>
        )
    }
    async function handleKembali(id) {
        await fetch(process.env.API_SERVER + `/admin/kembali/${id}`, {
            method: "PUT",
            headers: { Authorization: "Bearer " + token },
        })
        setUpdateActive(false)
        setClick(!click)
    }

    return (
        <AdminLayout>
            <div className={`${addActive || updateActive ? '' : 'hidden'} absolute top-0 left-0 w-screen h-screen bg-black opacity-50 duration-500 ease-out transition-opacity z-10`}></div>
            <div className={`${alert ? 'flex' : 'hidden'} absolute justify-center items-center top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 duration-500 ease-out transition-opacity z-50`}>
                <div className="flex flex-col items-center justify-between w-[400px] h-[200px] px-4 py-6 bg-white text-gray-900 rounded-2xl">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-2 bg-red-400 rounded-2xl animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h1 className="font-bold text-center text-lg">{message}</h1>
                    </div>
                    <div>
                        <button onClick={() => setAlert(false)} className="btn px-3">Oke</button>
                    </div>
                </div>
            </div>
            <div className="screen-bersih overflow-y-scroll srcool-hiden  relative w-full">
                <div className="flex items-center mb-3 space-x-2">
                    <form onSubmit={(e) => handleSearch(e)} className="w-full">
                        <input type="text" className="input" placeholder="No peminjaman ..."></input>
                    </form>
                </div>
                <table className="w-full text-sm">
                    <thead className="">
                        <tr className="text-left">
                            <th className="w-[80px] px-4 py-5 text-center bg-white rounded-l-xl">No</th>
                            <th className="w-[160px] px-4 py-5 bg-white">No. Peminjaman</th>
                            <th className="px-4 py-5 bg-white">Nama</th>
                            <th className="px-4 py-5 bg-white">Judul</th>
                            <th className="w-[200px] px-4 py-5 bg-white text-center">Tgl Kembali</th>
                            <th className="w-[150px] mb-5 px-4 py-5 text-center bg-white rounded-r-xl">Aksi</th>
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
                        {pinjam.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center">Data Anggota tidak ada</td>
                            </tr>
                        ) : (
                            pinjam.map((data, index) => (
                                <tr className="group hover:bg-gray-100 text-center" key={index}>
                                    <td className="p-3">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 text-left">{data.id}</td>
                                    <td className="max-w-[240px] p-4 text-left truncate">{data.user.nama}</td>
                                    <td className="max-w-[240px] p-4 text-left truncate">{data.buku.judul}</td>
                                    <td className="p-4 text-center">
                                        <span className="">
                                            {converDate(
                                                new Date(data.tgl_kembali).getDate(),
                                                new Date(data.tgl_kembali).getMonth(),
                                                new Date(data.tgl_kembali).getFullYear()
                                            )}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center space-x-1 text-xs">
                                        <button onClick={() => editOnClick(data.id)} className="btn px-2">Detail</button>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
                
                {feild && (

                    <div className={`${updateActive ? 'right-0' : '-right-full'} fixed top-0 h-screen w-[340px] px-4 py-6 bg-white space-y-4 z-20 ease-out duration-500 transition-all`}>
                        <h4 className="text-2xl font-bold my-5">Detail Peminjaman</h4>
                        <div className="w-full h-[360px] p-4 text-sm bg-gray-200 rounded-2xl">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">No.</th>
                                        <td>: {feild.id}</td>
                                    </tr>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">Nama</th>
                                        <td>: {feild.user.nama}</td>
                                    </tr>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">No.User</th>
                                        <td>: {feild.user.id}</td>
                                    </tr>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">Judul</th>
                                        <td>: {feild.buku.judul}</td>
                                    </tr>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">Kode</th>
                                        <td>: {feild.buku.no_panggil}</td>
                                    </tr>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">Pinjam</th>
                                        <td>: {converDate(
                                            new Date(feild.tgl_pinjam).getDate(),
                                            new Date(feild.tgl_pinjam).getMonth(),
                                            new Date(feild.tgl_pinjam).getFullYear()
                                        )}</td>
                                    </tr>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">Deadline</th>
                                        <td>: {converDate(
                                            new Date(feild.batas_pinjam).getDate(),
                                            new Date(feild.batas_pinjam).getMonth(),
                                            new Date(feild.batas_pinjam).getFullYear()
                                        )}</td>
                                    </tr>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">Status</th>
                                        <td>: {feild.status ? 'Belum dikembalikan' : 'Dikembalikan'}</td>
                                    </tr>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">Tanggal</th>
                                        <td>: {converDate(
                                            new Date(feild.tgl_kembali).getDate(),
                                            new Date(feild.tgl_kembali).getMonth(),
                                            new Date(feild.tgl_kembali).getFullYear()
                                        )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="w-[70px] py-1 text-left">Ket</th>
                                        <td>: {feild.ket_pengembalian}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="absolute space-y-2 bottom-10 right-4 left-4">
                            <button onClick={() => setUpdateActive(false)} className="btn-delete w-full">Keluar</button>
                        </div>
                    </div>
                )}

            </div>
            <Pagination rows={rows} page={page} pages={pages} />
        </AdminLayout>
    )
}