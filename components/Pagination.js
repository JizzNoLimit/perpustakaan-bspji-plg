import { useState } from "react"

export default function Pagination({rows, page, pages}) {
    const [Page, setPage] = useState(page)
    return(
        <div className="absolute flex items-center space-x-8 right-6 bottom-6 mx-4">
            <div className="">
                <p className="text-sm"><span className="font-bold">Total buku:</span> {rows}, <span className="font-bold">Page:</span> {Page + 1} dari {pages}</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
                <button disabled={Page === 0} onClick={() => setPage(Page - 1)} className="btn">Prev</button>
                <p>{Page + 1}</p>
                <button disabled={Page >= Page - 1} onClick={() => setPage(Page + 1)} className="btn">Next</button>
            </div>
        </div>
    )
}