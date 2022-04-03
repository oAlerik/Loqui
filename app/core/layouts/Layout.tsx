import { Head, BlitzLayout } from "blitz"
import { Suspense } from "react"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Loqui"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
    </>
  )
}

export default Layout
