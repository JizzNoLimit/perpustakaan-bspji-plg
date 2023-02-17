import Image from "next/image";
import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/Layout";
import Pagination from "../../../../components/Pagination";
import { authPageAdmin } from "../../../../middleware/authPage";

export async function getServerSideProps(ctx) {
    const { token } = await authPageAdmin(ctx)
    return { props: { token } }
}

export default function UsersIndex({token}) {
    const [users, setUsers] = useState('')
    const [click, setClick] = useState(false)
    const [feild, setFeild] = useState({
        nama: '', username: '', email: '', password: '', role: ''
    })
    const [addActive, setAddActive] = useState(false)
    const [updateActive, setUpdateActive] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [rows, setRows] = useState(0)
    useEffect(() => {
        getUsers()
    }, [keyword, page, click])
    async function getUsers() {
        const req = await fetch(process.env.API_SERVER + `/admin/users?search_query=${keyword}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token,
            }
        })
        const {data, metadata, message} = await req.json()
        setUsers(data)
        setPage(metadata.page)
        setPages(metadata.totalPage)
        setLimit(metadata.limit)
        setRows(metadata.totalRows)
    }
    const handleSubmit = async () => {
        fetch(process.env.API_SERVER + "/admin/users", {
            method: "POST",
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feild),
        })
            .then((res) => res.json())
            .then((data) => {
                setClick(!click)
                setAddActive(false)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const handleSubmitUpdate = async () => {
        fetch(process.env.API_SERVER + `/admin/user/update/${feild.id}`, {
            method: "PUT",
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feild),
        })
            .then((res) => res.json())
            .then((data) => {
                setClick(!click)
                setUpdateActive(false)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    async function editOnClick(id) {
        const req = await fetch(process.env.API_SERVER + `/admin/user/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        const user = await req.json()
        user.data.password = ''
        setFeild(user.data)
        setUpdateActive(true)
    }
    async function handleDelete(id) {
        await fetch(process.env.API_SERVER + `/admin/user/delete?id=${id}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
        })
        const userFilter = users.filter((data) => {
            return data.id !== id && data;
        });
        setClick(!click)
        setUsers(userFilter);
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
    return (
        <AdminLayout>
            <div className={`${addActive || updateActive ? '' : 'hidden'} absolute top-0 left-0 w-screen h-screen bg-black opacity-50 duration-500 ease-out transition-opacity z-10`}></div>
            <div className="screen-bersih overflow-y-scroll srcool-hiden  relative w-full">
                <div className="flex items-center mb-3 space-x-2">
                    <form onSubmit={(e) => handleSearch(e)} className="w-full">
                        <input type="text" className="input" placeholder="Cari buku berdasarkan judul atau kode panggil..."></input>
                    </form>
                    <button onClick={() => setAddActive(true)} className="btn text-sm w-auto">Anggota</button>
                </div>
                <table className="w-full text-sm">
                    <thead className="">
                        <tr className="text-left">
                            <th className="w-[80px] px-4 py-5 text-center bg-white rounded-l-xl">No</th>
                            <th className="w-[160px] px-4 py-5 text-left bg-white">No. Anggota</th>
                            <th className="px-4 py-5 bg-white">Nama</th>
                            <th className="px-4 py-5 bg-white">Email</th>
                            <th className="w-[100px] px-4 py-5 bg-white text-center">Role</th>
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
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center">Data Anggota tidak ada</td>
                            </tr>
                        ) : (
                            users.map((data, index) => (
                                <tr className="group hover:bg-gray-100 text-center" key={index}>
                                    <td className="p-3">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 text-left">{data.id}</td>
                                    <td className="max-w-[240px] p-4 text-left truncate">{data.nama}</td>
                                    <td className="max-w-[300px] p-4 text-left truncate">{data.email}</td>
                                    <td className="p-4 text-white text-center">
                                        <span className="px-3 bg-emerald-500 rounded-full">{data.role}</span>
                                    </td>
                                    <td className="p-4 text-center space-x-1 text-xs">
                                        <button onClick={() => editOnClick(data.id)} className="btn px-2">Edit</button>
                                        <button onClick={() => handleDelete(data.id)} className="btn-delete px-2">Hapus</button>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
                <div className={`${addActive ? 'right-0' : '-right-full'} fixed top-0 h-screen w-[340px] p-4 bg-white space-y-4 z-20 ease-out duration-500 transition-all`}>
                    <h4 className="text-2xl font-bold my-5">Users</h4>
                    <form onSubmit={(e) => e.preventDefault(e)}>
                        <section>
                            <label htmlFor="nama" className="mx-2 text-sm">
                                Nama
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="nama"
                                name="nama"
                                placeholder="Nama lengkap..."
                                className="input"
                            />
                            <label htmlFor="username" className="mx-2 text-sm">
                                Username
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username ..."
                                className="input"
                            />
                            <label htmlFor="email" className="mx-2 text-sm">
                                Email
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email ..."
                                className="input"
                            />
                            <label htmlFor="password" className="mx-2 text-sm">
                                Password
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="password"
                                name="password"
                                placeholder="Password ..."
                                className="input"
                            />
                            <label htmlFor="role" className="mx-2 text-sm">
                                Role
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="role"
                                name="role"
                                placeholder="Admin/Kepala/User"
                                className="input"
                            />
                        </section>
                    </form>
                    <div className="absolute space-y-2 bottom-10 right-4 left-4">
                        <button onClick={() => handleSubmit()} className={`btn w-full`}>Simpan</button>
                        <button onClick={() => setAddActive(false)} className="btn-delete w-full">Batal</button>
                    </div>
                </div>
                <div className={`${updateActive ? 'right-0' : '-right-full'} fixed top-0 h-screen w-[340px] p-4 bg-white space-y-4 z-20 ease-out duration-500 transition-all`}>
                    <h4 className="text-2xl font-bold my-5">Users</h4>
                    <form onSubmit={(e) => e.preventDefault(e)}>
                        <section>
                            <label htmlFor="nama" className="mx-2 text-sm">
                                Nama
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="nama"
                                name="nama"
                                value={feild.nama}
                                placeholder="Nama lengkap..."
                                className="input"
                            />
                            <label htmlFor="username" className="mx-2 text-sm">
                                Username
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="username"
                                name="username"
                                value={feild.username}
                                placeholder="Username ..."
                                className="input"
                            />
                            <label htmlFor="email" className="mx-2 text-sm">
                                Email
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="email"
                                name="email"
                                value={feild.email}
                                placeholder="Email ..."
                                className="input"
                            />
                            <label htmlFor="role" className="mx-2 text-sm">
                                Role
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="text"
                                id="role"
                                name="role"
                                value={feild.role}
                                placeholder="Admin/Kepala/User"
                                className="input"
                            />
                        </section>
                    </form>
                    <div className="absolute space-y-2 bottom-10 right-4 left-4">
                        <button onClick={() => handleSubmitUpdate()} className={`btn w-full`}>Simpan</button>
                        <button onClick={() => setUpdateActive(false)} className="btn-delete w-full">Batal</button>
                    </div>
                </div>
                
            </div>
            {/* <div className="absolute flex items-center space-x-8 right-6 bottom-6 mx-4">
                <div className="">
                    <p className="text-sm"><span className="font-bold">Total buku:</span> {rows}, <span className="font-bold">Page:</span> {page + 1} dari {pages}</p>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                    <button disabled={page === 0} onClick={() => setPage(page - 1)} className="btn">Prev</button>
                    <p>{page + 1}</p>
                    <button disabled={page === pages - 1} onClick={() => setPage(page + 1)} className="btn">Next</button>
                </div>
            </div> */}
            <Pagination rows={rows} page={page} pages={pages} />
        </AdminLayout>
    )
}