import React, { useState, useEffect } from 'react';
import { format, formatDistanceToNow, addDays, subDays } from 'date-fns';
// 한국어 설정 불러오기 (이거 없으면 영어로 나옴)
import { ko } from 'date-fns/locale';

function DateSample() {
  const [now, setNow] = useState(new Date());

  // 시계처럼 1초마다 시간 갱신 (테스트용)
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    
    return () => clearInterval(timer);
  }, []);

  // 테스트용 가짜 날짜 데이터
  const threeDaysAgo = subDays(now, 3); // 3일 전
  const oneHourAgo = new Date(now.getTime() - 1000 * 60 * 60); // 1시간 전
  const nextWeek = addDays(now, 7); // 7일 후

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
        Date-fns 사용 예제
      </h2>

      <div className="space-y-6">
        
        {/* 기본 날짜 포맷팅 (가장 많이 씀) */}
        <div>
          <h3 className="text-sm font-bold text-blue-500 mb-1">1. 날짜 예쁘게 보여주기 (format)</h3>
          <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <p>원본: {now.toString()}</p>
            <p className="font-bold text-green-600">
              결과: {
                format(now, 'yyyy년 MM월 dd일 a hh시 mm분 ss초', { locale: ko })
              }
            </p>
            <p className="text-xs text-gray-500">
              (yyyy-MM-dd 등 원하는 대로 조합 가능)
            </p>
          </div>
        </div>

        {/* 상대 시간 (SNS 스타일) */}
        <div>
          <h3 className="text-sm font-bold text-blue-500 mb-1">2. 상대 시간 (formatDistanceToNow)</h3>
          <p className="text-xs text-gray-500 mb-2">댓글이나 게시글 시간 표시할 때 필수!</p>
          <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <div className="flex justify-between">
              <span>작성일(1시간 전):</span>
              <span className="font-bold">
                {formatDistanceToNow(oneHourAgo, { addSuffix: true, locale: ko })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>작성일(3일 전):</span>
              <span className="font-bold">
                {formatDistanceToNow(threeDaysAgo, { addSuffix: true, locale: ko })}
              </span>
            </div>
          </div>
        </div>

        {/* 날짜 더하기/빼기 (D-Day 계산 등) */}
        <div>
          <h3 className="text-sm font-bold text-blue-500 mb-1">3. 날짜 계산 (add/sub)</h3>
          <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded text-sm text-gray-700 dark:text-gray-300">
            <p>오늘: {format(now, 'yyyy-MM-dd')}</p>
            <p>
              일주일 뒤 (addDays): <span className="font-bold">{format(nextWeek, 'yyyy-MM-dd')}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DateSample;