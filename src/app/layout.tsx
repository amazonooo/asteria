import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from '@/providers/query-provider'
import ContainerWrapper from '@/components/layout/container/container-wrapper'
import { SidebarProvider } from '@/providers/sidebar-provider'
import { PROJECT_DESCRIPTION, PROJECT_NAME } from '@/constants/seo.constants'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
		default: PROJECT_NAME,
		template: `%s | ${PROJECT_NAME}`
	},
  description: PROJECT_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0D0D0D]`}
			>
				<QueryProvider>
					<SidebarProvider>
						<ContainerWrapper>{children}</ContainerWrapper>
					</SidebarProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
