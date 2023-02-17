import Image from "next/image"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/Layout"
import { authPageAdmin } from "../../../middleware/authPage"

export async function getServerSideProps(ctx) {
    const {user} = await authPageAdmin(ctx)
    return {props: {}}
}

function DashboardIndex(){
    const [data, setData] = useState({
        user: 0, buku: 0, pinjam: 0, kembali: 0
    })

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        const req = await fetch(process.env.API_SERVER + `/total-data`, {
            method: "GET",
        })
        const { data } = await req.json()
        setData(data)
    }
    return (
        <>
            <AdminLayout>
                <div className="w-full space-y-4 text-center">
                    <div className="w-full h-[380px] p-3 bg-white rounded-xl">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-emerald-900 opacity-30 z-10"></div>
                            <Image src={'/image/ampera.jpg'} alt="ampera" fill sizes="800px" style={{objectFit:"cover"}}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="relative flex justify-center items-center w-full h-32 text-center border-2 bg-white rounded-xl">
                            <div className="absolute flex justify-center items-center w-12 h-12 bg-red-200 -top-1 -right-1 text-xl rounded-full">
                                📕
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    {data.buku}
                                </h1>
                                <p>Koleksi Buku</p>
                            </div>
                        </div>
                        <div className="relative flex justify-center items-center w-full h-32 text-center border-2 bg-white rounded-xl">
                            <div className="absolute flex justify-center items-center w-12 h-12 bg-red-200 -top-1 -right-1 text-xl rounded-full">
                                👨‍🔬
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    {data.user}
                                </h1>
                                <p>Anggota</p>
                            </div>
                        </div>
                        <div className="relative flex justify-center items-center w-full h-32 text-center border-2 bg-white rounded-xl">
                            <div className="absolute flex justify-center items-center w-12 h-12 bg-red-200 -top-1 -right-1 text-xl rounded-full">
                                🕵️
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    {data.kembali}
                                </h1>
                                <p>Belum Dikembalikan</p>
                            </div>
                        </div>
                        <div className="relative flex justify-center items-center w-full h-32 text-center border-2 bg-white rounded-xl">
                            <div className="absolute flex justify-center items-center w-12 h-12 bg-red-200 -top-1 -right-1 text-xl rounded-full">
                                📈
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    {data.pinjam}
                                </h1>
                                <p>Peminjaman</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default DashboardIndex