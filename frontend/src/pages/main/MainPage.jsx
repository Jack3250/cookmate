import React from 'react';
import Announcement from '../../components/mainPage/Announcement';
import BestRecipe from '../../components/mainPage/BestRecipe';
import LivePost from '../../components/mainPage/LivePost';
import RecentRecipe from '../../components/mainPage/ResentRecipe';


function MainPage() {
  const bestRecipes = [
    { id: 1, title: '타히니 드레싱을 곁들인 궁극의 건강 그린 샐러드 볼', chef: '쉐프안나', likes: 45, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFczYV_FAeM4bgX63O3lZjdk3r1pskFXRcyHTXFFaQgNc_Siqr6nHYqj9eMt3CKxKqZGlAwc9voQ9tIVVXaPacqql-h7DJVnFcDMl74AV7lcskQrZEUm1YDS3h1MHRxnBTIpt6YunEYb12v_up5k-6TMaQ61vxqJZsXpFcJ_7cOQ4fgH9Poj5H_JcXPbDwTGJ6ZZqIzrG7PJQpaqWRH9nE1qoxB40Lzid1NeRU2spjKh4EoSQ5Qv9mx6MqBnkLKLoduXNphpKygWTh' },
    { id: 2, title: '집에서 만드는 나폴리 피자: 비밀의 도우 레시피', chef: '피자러버', likes: 38, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd8PFMVPQawJ5Q67pq11FXdGZNWopCc85GIn01BG2C1x6Gl2UPfc_zMLj4WNOVa2ZIAFQN9x9Qj8AaKzgHFkkdQc6TrkLg0eHOV8H21sf25DHptuBMZkyKrtpSl9RF6AYp6cuLxSbiV6jMfZ1GXC-SefWZOi5YsvtpYqZWbp2F0Nj8OutZG69fhk4tgH-UCVbby-wYfDfZI_5lPFIMjehuXDdU8YWM1oWzSmKBbAa7hS4bhmW8tgBDuPvttisK9yreDcFVBHStHNMi' },
    { id: 3, title: '매콤달콤 한국식 양념치킨 만들기', chef: 'K-푸디', likes: 120, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXWO2I6DjkLPqCkTHTv9fHrhE1Dqz7SPZf5zXYqBZEcyuUvhLVO3O_5LyQVFOJaslcxqStBLhbzu7yUoRUxunvskP1YxHssK3KZmnVQI-0nb9hxmAwspiXpikx79UqB9goXhaEFON18oajlfzHDvf0bUwCbjYW6BTQTe5FlyfVgOBhOecN_5iMKGtwu3jmhwTMXIN2fxI5MuhdOGVhbAMeyOVfzl4uFn4rLzbGwiQi2OAIvUEoE7zHyg5uOBVdSr7TWAHU4Od1nKto' },
    { id: 4, title: '베리 콩포트를 곁들인 푹신한 일요일 팬케이크', chef: '브런치퀸', likes: 67, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIwof_TAn_pJB2jogNJjMuWu8rkXsxy6504J7pl6D9APC5cJsq00OAX0Iqc3eVNM4Zsan4EdJhfH8biRpy_vD6EqexUvYDH52QSWo6i1w9ccn1_ETtOA0sslfIuLz3moqak3msOPxZYAdBxccqtDZ8LTFe_GAXFQ6WtmpchgeztcBddyMo7qeHqwAJl_3tlji_AHWvVlIDfdlHTwA8fIkThJlBVvTo8fWc6WPsv82WIYs8Rz_HKQBHDIFKpAE3CXkDiK2qoibRhBET' },
  ];

  const recentRecipes = [
    { id: 1, title: '아침 토스트', chef: '유저123', views: 40, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA32DZsMiuwNsTeGxspYHWGcdFGgWnC_xQppz05v4gZf-7Ec0RosUIN4TASr8PB2RxKfLKwMmNZE26z9Xxj3BmQjQnUN_jikXBZmPHh41TdvV6s-FjzLDF9vBg4ptDJJ246H38fvdCPdFTLTU62K-ZeNB1PLOCV9jVDnmqjgaBYXMw4q1TQoAW8HmXkila_K_MEBZ1noqEY_HKZVc_A-QOG450dIqh3FZM4sy6_qDriXAL460FA0fhQsOWWzykNS2xZJwZX0M2826yL' },
    { id: 2, title: '크리미 호박 수프', chef: '수프마스터', views: 152, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiLAoKwt7TsMuQnuIBRtCfaLVPtL139ODZWAR8Hz51LF_GfEeyNGKfCMzpblsl60zEsUhJjki5HKkfTOR0MeNjzcDOcOS0ViIMzEx2qJr7OEMQZi8jxJlUsuwEMy_aCB6OJKXX7SV_qWwQa6ZomQEvAnKEr9iz8WYFWWru7CFMixhxA9TidxGu3JKeFEstS2wMDxQDqBuCS1Ha5UKDQf3Xwxhta2OzH5gur9d2e91UgMlgZsLlcyEgc4gb3badxJiBqEQT_uCsZYQS' },
    { id: 3, title: '상쾌한 모히또', chef: '바텐더', views: 88, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDlfODciepnMaPO8iI8nuVfAKbN4vPyN3QpsycJ8-4QcSdwgKCzIBFmJzWA6xphvn-Lwk100VYWpnf6VfoXC_hb7-bEAJ1JyUoWIgNjC9ievf04GKC-iXfolvWWiArKLp608DwcpwJsJD2coy3woDngdW9ZH3-eTfpDTeYP5_KDWzAqSBrqRLR7mmat6wWQvw7wKnw-16-dhGIelXk26dDzb9hzgBAG0da2Za2_X0FFFS5NMzAZb8eL240kChXWk60fq0xrP7wJ-aG' },
    { id: 4, title: '정통 까르보나라', chef: '이탈리안쉐프', views: 210, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnLTmETZwmQRS6Gs-aRRrvFnAiueK3wBbTWMhevxA_xOmfO-LGl030HqMOrkapXoEC0LH950pgPVzvn42r1hbBayobrqQ1cMwhI388EscyLlUhXlEZO6WtjixLQCl1BOJRH4kCqrr3kkkx2MKZ0VgmNgdQec9-YYVD10e-xrpWrBXDEwhmOLCnhm80zcTgmtGuyuM-A831a_8evxVbHPxIVNk6-pBmueAgffwAzUunXBcYuQuSSr6EgcHY9eZ41dOP-_d4yEP8qClK' },
    { id: 5, title: '오이 샐러드', chef: '채식러버', views: 56, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFYrxqGUvt0zX3BmNZ8faXPSRy97Ws4ykA5xGMmwkTYXmCgz45_o3gqxpA0BnUai8aEBB3PnCRdqiLPg5p6xFc6OoJkxlz-T2aowvx88hku5YkEX51ghbMNT3Ag5UY1al1mIku8IkfatF6WKy4myQVWql8zeCLYyc1aw4-KgcRrz-xYZAMoIma8GR1PwNwDOAWHXPZqFmoUyLEsn22TkeX8d_x4ze3ROabAZ1yz7wMfUUkFObhEyW-pMMiXcp8b5idFuT3u0FXPtzt' },
  ];

  return (
    <> 
      {/* 공지사항 */}
      <Announcement />

      {/* 인기 레시피 */}
      <BestRecipe recipes={bestRecipes} />

      {/* 실시간 게시글 */}
      <LivePost />
      
      {/* 방금 올라온 레시피 */}
      <RecentRecipe recipes={recentRecipes} />
    </>
  );
}

export default MainPage;