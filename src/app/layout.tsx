import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '智慧党建学习平台 | AI驱动学习新体验',
    template: '%s | 智慧党建学习平台',
  },
  description:
    '通过AI智能分析，为您量身定制学习路径，让党建知识学习更加高效有趣。提供智能学习诊断、知识图谱可视化、AI学习助手等功能。',
  keywords: [
    '智慧党建',
    'AI学习',
    '党建学习平台',
    '思维导图',
    '知识图谱',
    '学习路径规划',
    '党员教育',
    '党务培训',
    '二十大精神学习',
    '党史学习',
  ],
  authors: [{ name: '智慧党建平台', url: process.env.COZE_PROJECT_DOMAIN_DEFAULT }],
  generator: 'Coze Code',
  // icons: {
  //   icon: '',
  // },
  openGraph: {
    title: '智慧党建学习平台 | AI驱动学习新体验',
    description:
      '通过AI智能分析，为您量身定制学习路径，让党建知识学习更加高效有趣。',
    url: process.env.COZE_PROJECT_DOMAIN_DEFAULT,
    siteName: '智慧党建学习平台',
    locale: 'zh_CN',
    type: 'website',
    // images: [
    //   {
    //     url: '',
    //     width: 1200,
    //     height: 630,
    //     alt: '扣子编程 - 你的 AI 工程师',
    //   },
    // ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Coze Code | Your AI Engineer is Here',
  //   description:
  //     'Build and deploy full-stack applications through AI conversation. No env setup, just flow.',
  //   // images: [''],
  // },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
