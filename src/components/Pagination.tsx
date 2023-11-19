'use client'
import { PaginationType } from "@/app/utils/PaginationType";

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS -1) /2;

export function Pagination(prop: PaginationType) {
    const current = prop.offset ? (prop.offset / prop.limit) + 1 : 1;
    const pages = Math.ceil(prop.total / prop.limit);
    const firstBtn = Math.max(current - MAX_LEFT, 1);
    return (
        <ul className="join mt-5">
            {
                (Array.from({length: MAX_ITEMS})
                    .map((_, index) => index + firstBtn))
                    .map((page) => (
                        <li key={page}>
                            <button className="join-item btn" onClick={() => {}}>
                                {page}
                            </button>
                        </li>
                    ))
            }
            {/* <li className="join-item btn">1</li>
            <li className="join-item btn">2</li>
            <li className="join-item btn btn-disabled">...</li>
            <li className="join-item btn">99</li>
            <li className="join-item btn">100</li> */}
        </ul>
    );
}