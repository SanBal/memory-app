import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center p-1 bg-gradient-to-r from-violet-100 to-fuchisia-100 to-rose-100">{children}</body>
    </html>
  )
}