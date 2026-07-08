import React from 'react'

function Footer() {
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-8 mt-8">
      <div className="container mx-auto max-w-6xl px-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <div className="flex justify-center gap-4 mb-4">
          <a className="hover:text-gray-800 dark:hover:text-gray-200" href="#">커뮤니티 소개</a>
          <a className="hover:text-gray-800 dark:hover:text-gray-200" href="#">이용약관</a>
          <a className="hover:text-gray-800 dark:hover:text-gray-200 font-bold" href="#">개인정보처리방침</a>
          <a className="hover:text-gray-800 dark:hover:text-gray-200" href="#">청소년보호정책</a>
        </div>
        <p className="mb-2">프레시 쿠킹 커뮤니티 | 대표: 쉐프 그린 | 사업자등록번호: 123-45-67890</p>
        <p>Copyright © Fresh Cooking Corp. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer