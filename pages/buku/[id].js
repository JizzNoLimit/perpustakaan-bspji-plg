import { Layout } from "../../components/Layout";
import Head from 'next/head'
import Image from 'next/image'
import cookies from "next-cookies";
import jwt from "jsonwebtoken";

export async function getServerSideProps(ctx) {
    const token = cookies(ctx)
    const { id } = ctx.query

    const req = await fetch(process.env.API_SERVER + '/buku/' + id, {
        method: "GET"
    })
    const buku = await req.json()
    if (!token.token) {
        return {
            props: {
                user: '',
                buku: buku.data
            }
        }
    } else {
        const decode = jwt.decode(token.token, process.env.TOKEN_SECRET)
        return {
            props: {
                user: decode,
                buku: buku.data
            }
        }
    }
}

export default function BukuId({user, buku}) {
    console.log(buku)
    return(
        <Layout user={user}>
            <div className="mt-[70px] px-12 py-4 bg-gray-200">
                <div className="grid grid-cols-[270px_auto] gap-10 w-full p-8 bg-white rounded-2xl">
                    <div className="relative w-full h-[380px] bg-slate-400 rounded-xl overflow-hidden">
                        <Image src={`${process.env.SERVER}/uploads/cover/${buku.img_url}`} alt='cover' fill sizes="200px" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="">
                        <h1 className="text-5xl font-bold">{buku.judul}</h1>
                        <p className="text-gray-500 mt-2">Author: {buku.pengarang}</p>
                        <p className="mt-4">{buku.desk}</p>
                        <p className="mt-4 mb-2 text-justify font-bold">Informasi Buku:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th className="w-[100px] text-left">Kode</th>
                                    <td>: {buku.no_panggil}</td>
                                </tr>
                                <tr>
                                    <th className="w-[100px] text-left">Penerbit</th>
                                    <td>: {buku.penerbit}</td>
                                </tr>
                                <tr>
                                    <th className="w-[100px] text-left">ISBN</th>
                                    <td>: {buku.isbn}</td>
                                </tr>
                                <tr>
                                    <th className="w-[100px] text-left">No. Buku</th>
                                    <td>: {buku.id}</td>
                                </tr>
                                <tr>
                                    <th className="w-[100px] text-left">Bahasa</th>
                                    <td>: {buku.bahasa}</td>
                                </tr>
                                <tr>
                                    <th className="w-[100px] text-left">Tahun</th>
                                    <td>: {buku.tahun}</td>
                                </tr>
                                <tr>
                                    <th className="w-[100px] text-left">Kategori</th>
                                    <td>: {buku.kategori}</td>
                                </tr>
                                <tr>
                                    <th className="w-[100px] text-left">Fisik</th>
                                    <td>: {buku.fisik}</td>
                                </tr>
                                <tr>
                                    <th className="w-[100px] text-left">Status</th>
                                    <td>
                                        : {buku.status ? (
                                            <span className="px-2 py-0 bg-emerald-500">Tersedia</span>
                                        ) : (
                                            <span className="px-2 py-0 bg-red-500">Dipinjam</span>
                                        )}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}