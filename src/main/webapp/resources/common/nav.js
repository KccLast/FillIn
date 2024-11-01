window.onload = function () {
  setNavLink();
};

function setNavLink() {
  // 현재 URL 확인
  let curWindow = location.href;

  // URL에 '/survey/'가 포함된 경우에만 실행

  let pathName = window.location.pathname;
  let surveySeq;

  if (pathName.includes('/statistic/keyword')) {
    const urlParams = new URLSearchParams(window.location.search);
    surveySeq = urlParams.get('surveySeq');
  } else {
    surveySeq = pathName.substring(pathName.lastIndexOf('/') + 1);
  }
  // 각 링크 생성
  let editLink = '/survey/' + surveySeq;
  let statisticLink = '/statistic/' + surveySeq;
  let clusterLink = '/statistic/clustering/' + surveySeq;
  let linerLink = '/statistics/liner-regression/' + surveySeq;
  let logLink = '/survey/logs/' + surveySeq;

  // 링크가 초기화되지 않았다면 각 링크에 href 속성 설정

  const navLinks = document.querySelectorAll('.nav > .nav-link');

  navLinks[0].setAttribute('href', editLink);
  navLinks[1].setAttribute('href', statisticLink);
  navLinks[2].setAttribute('href', clusterLink);
  navLinks[3].setAttribute('href', linerLink);
  navLinks[4].setAttribute('href', logLink);

  // 초기화 완료 표시
}
