import React from 'react';

function LivePost() {
  const dummyPost = [
    { type: '질문', color: 'blue', text: '빵 반죽이 너무 끈적거려요, 도와주세요!', time: '5분 전' },
    { type: '팁', color: 'green', text: '버터밀크 대체품으로 뭐가 좋을까요?', time: '12분 전' },
    { type: '잡담', color: 'purple', text: '새로 산 스탠드 믹서가 도착했어요!', time: '24분 전' },
    { type: '후기', color: 'gray', text: '새로 나온 에어프라이어 모델 솔직 후기', time: '1시간 전' }
  ];

  return (
    <section className="mb-10">
      
      <div className="flex items-center justify-between mb-4 border-b border-border-light dark:border-border-dark pb-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="material-icons text-primary">chat</span>
          실시간 게시글
        </h3>
        <a className="text-xs text-gray-500 hover:text-primary" href="#">더보기 &gt;</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* 왼쪽 일반 게시글 */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg p-0">
          <ul className="divide-y divide-border-light dark:divide-border-dark">
            {dummyPost.map((item, idx) => (
                <li key={idx} className="py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800 px-2 rounded cursor-pointer">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className={`bg-${item.color}-100 text-${item.color}-600 dark:bg-${item.color}-900 dark:text-${item.color}-300 text-[10px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap`}>{item.type}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{item.text}</span>
                    </div>
                    <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{item.time}</span>
                </li>
            ))}
          </ul>
        </div>

        {/* 우측 사진 게시글 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <img alt="바비큐" className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqR8hgsycldLiJFWh1shV9P5W-gFl2Lq09Um4MVedBWDxnQyD39A6vc2Ys2ubAryZKjBJ8JI260nY_UBr_tqrXga367032EXUbRl32Sz8V9R-y5mc22V4INhW67jhbPkjQCviRkEVfgoAz11bkdExYA1KE0s8766kzeN3fBp_adMMhJF9dtgIY8gSNqqeEHgnMHBPMt1ggk-sHLrOVXTbIuQNvB8LmAW10tSIeSdY1PttkZZHiTAnQKK5tUGg7IAH3BBQPEhRDqVa5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
              <span className="text-white text-xs font-bold truncate">주말 BBQ 파티</span>
            </div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <img alt="디저트" className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS52axsJ727NTrUzC2zDiL1Ua1qO4fo-H1Z7YdId6nalfRJtm9WdQQBZ9fz6-zeq0n4_-wa_CJBPzToI0HtKwfC52gzQn_d0F5SQRDGEmgssyyUDQui8rC0vgUv6iBe8JawT6SVXG5KtFOYUNqmbfTyHDb8QWS_gfsx7L8xo8hd4Je-jem_AoAzW8waErrA_Y_F1JjadQZfOiQni5aNcxPKZIQHJb-0VlDEUsFABT6AYb8gi_ldElxGumzPueSANUg1OyY1P_LHoys" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
              <span className="text-white text-xs font-bold truncate">초간단 노오븐 치즈케이크</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default LivePost;