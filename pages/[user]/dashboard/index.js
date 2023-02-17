import Image from "next/image";
import { useEffect, useState } from "react";
import { UserLayout } from "../../../components/Layout"
import { authPageUser } from "../../../middleware/authPage";

export async function getServerSideProps(ctx) {
    const {user} = await authPageUser(ctx)
    return {props: {
        user
    }}
}

const DashboardIndex = ({user}) => {
    const [data, setData] = useState('')
    const [pinjam, setPinjam] = useState('')

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        const req = await fetch(process.env.API_SERVER + `/user/data/${user.id}`, {
            method: "GET",
        })
        const data = await req.json()
        setData(data.pinjamCount)
        setPinjam(data.pinjam)
    }
    function converDate(dd, mm, yy) {
        const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

        return (
            <span className="text-sm">{dd} {bulan[mm]} {yy}</span>
        )
    }
    return(
        <>
        <UserLayout>
                <div className="w-full space-y-4 text-center">
                    <div className="relative grid grid-cols-[auto_200px_200px] gap-3 w-full h-[140px] p-3 bg-white rounded-xl">
                        <div className="relative flex p-2 w-full h-full space-x-4 text-center border-2  bg-white rounded-xl">
                            <div className="flex justify-center items-center w-[80px] h-full rounded-lg">
                                <h1 className="text-6xl text-center">🧑‍💻</h1>
                            </div>
                                <div className="py-4">
                                    <h1 className="text-left text-2xl font-bold">{user.nama} </h1>
                                    <p className="text-left "><strong>ID:</strong> <i>{user.id} </i></p>
                                </div>

                        </div>
                        <div className="relative flex justify-center items-center w-full h-full text-center border-2 bg-white rounded-xl">
                            <div className="absolute flex justify-center items-center w-12 h-12 bg-red-200 -top-1 -right-1 text-xl rounded-full">
                                📕
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    {user.skor_kredit}
                                </h1>
                                <p>Skror Kredit</p>
                            </div>
                        </div>
                        <div className="relative flex justify-center items-center w-full h-full text-center border-2 bg-white rounded-xl">
                            <div className="absolute flex justify-center items-center w-12 h-12 bg-red-200 -top-1 -right-1 text-xl rounded-full">
                                📕
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    {data}
                                </h1>
                                <p>Pijam Buku</p>
                            </div>
                        </div>

                    </div>
                    <div className="text-left px-4 pt-2 pb-0">
                        <h1 className="font-bold">History Peminjaman</h1>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="">
                            <tr className="text-left">
                                <th className="w-[120px] px-4 py-5 text-center bg-white rounded-l-xl">Cover</th>
                                <th className="w-[180px] px-4 py-5 text-left bg-white">No.Pinjam</th>
                                <th className="px-4 py-5 bg-white">Judul</th>
                                <th className="w-[180px] px-4 py-5 text-center bg-white">Tgl Pinjam</th>
                                <th className="w-[180px] mb-5 px-4 py-5 text-center bg-white rounded-r-xl">Tgl Kembali</th>
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
                            {pinjam ? (
                                pinjam.map((data, index) => (

                                    <tr className="group hover:bg-gray-100" key={index}>
                                        <td className="p-3">
                                            <div className="relative w-[80px] h-10 m-auto group-hover:h-[100px] bg-slate-700 ease-out duration-300 transition-all delay-100">
                                                <Image src={`${process.env.SERVER}/uploads/cover/${data.buku.img_url}`} alt='cover' fill sizes="80px" style={{ objectFit: "cover" }} />
                                            </div>
                                        </td>
                                        <td className="px-4 text-left">{data.id} </td>
                                        <td className="px-4 text-left">{data.buku.judul} </td>
                                        <td className="px-4 text-center">
                                            {converDate(
                                                new Date(data.tgl_pinjam).getDate(),
                                                new Date(data.tgl_pinjam).getMonth(),
                                                new Date(data.tgl_pinjam).getFullYear()
                                            )}
                                        </td>
                                        <td className="px-4 text-center">
                                            {converDate(
                                                new Date(data.tgl_kembali).getDate(),
                                                new Date(data.tgl_kembali).getMonth(),
                                                new Date(data.tgl_kembali).getFullYear()
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center">Data peminjaman belum ada</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                </div>
        </UserLayout>
        </>
    )
}

export default DashboardIndex