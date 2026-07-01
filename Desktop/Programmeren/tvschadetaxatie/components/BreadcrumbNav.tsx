import Link from "next/link"

interface Crumb {
  name: string
  href?: string
}

export default function BreadcrumbNav({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-1 items-center">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span>/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-sky-700 transition-colors">
                {crumb.name}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
