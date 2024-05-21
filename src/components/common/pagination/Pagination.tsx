'use client'
import { generatePaginationNumbers } from '@/utils'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import styles from './Pagination.module.scss'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Props {
    totalPages: number
}
export const Pagination = ({ totalPages }: Props) => {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const pageString = searchParams.get('page') ?? 1
    let currentPage = isNaN(+pageString) ? 1 : +pageString

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathname)
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages)

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)

        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`
        }

        if (Number(pageNumber) <= 0) {
            return `${pathname}`
        }

        if (Number(pageNumber) > totalPages) {
            return `${pathname}?${params.toString()}`
        }

        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    return (
        <div className={styles.container}>
            <Link href={createPageUrl(currentPage - 1)}
                className={styles.arrow}>
                <IoChevronBackOutline size={30} />
            </Link>

            {allPages.map((page, index) => (
                <Link href={createPageUrl(page)} className={`${styles.page} ${page === currentPage ? styles.active : ''}`} key={`${page}-${index}`}>
                    {page}
                </Link>
            ))}
            <Link href={createPageUrl(currentPage + 1)} className={styles.arrow}>
                <IoChevronForwardOutline size={30} />
            </Link>
        </div>
    )
}
