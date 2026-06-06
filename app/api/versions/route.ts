import { NextResponse } from 'next/server'
import { FALLBACK_VERSIONS } from '@/lib/pkg-versions'

const PACKAGES = [
  'next', 'react', 'vue', 'nuxt', 'svelte', '@sveltejs/kit',
  'vite', 'rollup', 'webpack',
  'typescript',
  'tailwindcss', 'styled-components',
  'antd', '@mui/material', '@chakra-ui/react',
  'element-plus', 'ant-design-vue', 'naive-ui', 'daisyui',
  'zustand', '@reduxjs/toolkit', 'jotai', 'pinia',
  '@tanstack/react-query', '@tanstack/vue-query', 'swr',
  'eslint', 'prettier', '@biomejs/biome',
  'next-intl', 'i18next', 'vue-i18n', '@nuxtjs/i18n',
]

async function fetchLatest(pkg: string): Promise<[string, string]> {
  try {
    // Use Next.js server-side fetch caching: revalidate every hour
    const res = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error(`${res.status}`)
    const data = await res.json() as { version: string }
    // Only keep major version: '19.1.0' → '19'
    const major = data.version.split('.')[0]
    return [pkg, major]
  } catch {
    const fallback = FALLBACK_VERSIONS[pkg] ?? '0'
    return [pkg, fallback]
  }
}

export async function GET() {
  const results = await Promise.all(PACKAGES.map(fetchLatest))
  const versions = Object.fromEntries(results)
  return NextResponse.json(versions)
}
