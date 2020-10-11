/*Pacer is a Wechat App what used for pace conversion and step frequency step calculation*/
/*The author is Ghostxiu, GitHub address https://github.com/ghostxiu, please keep this statement for reprinting. */
var second_per_min = 60;
var second_per_hour = 3600;
var km5_l = 5000;
var km10_l = km5_l * 2.0;
var mara_l = km10_l * 4.2195;
var half_mara_l = mara_l / 2.0;
var km_l = km5_l / 5.0;

function MinPace(second_per_meter) {
  return km_l / second_per_meter;
}

function pacerToSecM(min, sec) {
  return km_l / (min * second_per_min + parseInt(sec));
}

function Five_km_race(min, sec) {
  var second_per_meter = pacerToSecM(min, sec);
  var min5 = parseInt(km5_l / second_per_meter) / second_per_min;
  var sec5 = parseInt(km5_l / second_per_meter) % second_per_min;
  return [parseInt(min5), parseInt(sec5)];
}

function Ten_km_race(min, sec) {
  var second_per_meter = pacerToSecM(min, sec);
  var h10 = parseInt(parseInt(km10_l / second_per_meter) / second_per_hour);
  var min10 = parseInt((km10_l / second_per_meter) / second_per_min) - second_per_min * h10;
  var sec10 = parseInt(km10_l / second_per_meter) % second_per_hour
    - second_per_min * min10;
  return [parseInt(h10), parseInt(min10), parseInt(sec10)];
}

function Half_marathon_race(min, sec) {
  var second_per_meter = pacerToSecM(min, sec);
  var h_ha = parseInt(parseInt(half_mara_l / second_per_meter) / second_per_hour);
  var min_ha = parseInt((half_mara_l / second_per_meter) / second_per_min) - second_per_min * h_ha;
  var sec_ha = parseInt(half_mara_l / second_per_meter) % second_per_hour
    - second_per_min * min_ha;
  return [parseInt(h_ha), parseInt(min_ha), parseInt(sec_ha)];
}

function Marathon_race(min, sec) {
  var second_per_meter = pacerToSecM(min, sec);

  var h_ma = parseInt(parseInt(mara_l / second_per_meter) / second_per_hour);
  var min_ma = parseInt((mara_l / second_per_meter) / second_per_min) - second_per_min * h_ma;
  var sec_ma = parseInt(mara_l / second_per_meter) % second_per_hour
    - second_per_min * min_ma;
  return [parseInt(h_ma), parseInt(min_ma), parseInt(sec_ma)];
}


function getRatemin(min, sec,st)
{
  //获取每分钟的步频
  var second_per_meter = pacerToSecM(min, sec);
  var stride_rate_min = second_per_meter / st * second_per_min;
  return stride_rate_min;
}


function getStride(min, sec,sr) {
  //获取每次的步幅
  var second_per_meter = pacerToSecM(min, sec);
  var stride_rate_s = sr / 60;
  var stride_lar = second_per_meter / stride_rate_s;
  return stride_lar;
}
function Pkm_to_400m(min,sec)
{
  //1km配速转化为400米圈速
  var sec_400 = parseInt((parseInt(min) * 60) + parseInt(sec))/2.5;
  return sec_400;
} 
function P400m_to_km(sec_400) {
  //1km配速转化为400米圈速
  var sec_km = sec_400 * 2.5;
  var min = parseInt(sec_km)/60;
  var sec = parseInt(sec_km)%60;
  return [parseInt(min),sec];
} 
module.exports.Five_km_race = Five_km_race
module.exports.Ten_km_race = Ten_km_race
module.exports.Half_marathon_race = Half_marathon_race
module.exports.Marathon_race = Marathon_race
module.exports.getRatemin = getRatemin
module.exports.getStride = getStride
module.exports.Pkm_to_400m = Pkm_to_400m
module.exports.P400m_to_km = P400m_to_km

    /*Touched by Ghostxiu 2020.5 */