import hokkaido from './P11-10_01-jgd-g_BusStop.json'
import aomori from './P11-10_02-jgd-g_BusStop.json'
import iwate from './P11-10_03-jgd-g_BusStop.json'
import miyagi from './P11-10_04-jgd-g_BusStop.json'
import akita from './P11-10_05-jgd-g_BusStop.json'
import yamagata from './P11-10_06-jgd-g_BusStop.json'
import hukushima from './P11-10_07-jgd-g_BusStop.json'
import ibaraki from './P11-10_08-jgd-g_BusStop.json'
import tochigi from './P11-10_09-jgd-g_BusStop.json'
import gunma from './P11-10_10-jgd-g_BusStop.json'
import saitama from './P11-10_11-jgd-g_BusStop.json'
import chiba from './P11-10_12-jgd-g_BusStop.json'
import tokyo from './P11-10_13-jgd-g_BusStop.json'
import kanagawa from './P11-10_14-jgd-g_BusStop.json'
import nigata from './P11-10_15-jgd-g_BusStop.json'
import toyama from './P11-10_16-jgd-g_BusStop.json'
import ishikawa from './P11-10_17-jgd-g_BusStop.json'
import hukui from './P11-10_18-jgd-g_BusStop.json'
import yamanashi from './P11-10_19-jgd-g_BusStop.json'
import nagano from './P11-10_20-jgd-g_BusStop.json'
import gihu from './P11-10_21-jgd-g_BusStop.json'
import shizuoka from './P11-10_22-jgd-g_BusStop.json'
import aichi from './P11-10_23-jgd-g_BusStop.json'
import mie from './P11-10_24-jgd-g_BusStop.json'
import shiga from './P11-10_25-jgd-g_BusStop.json'
import kyoto from './P11-10_26-jgd-g_BusStop.json'
import osaka from './P11-10_27-jgd-g_BusStop.json'
import hyogo from './P11-10_28-jgd-g_BusStop.json'
import nara from './P11-10_29-jgd-g_BusStop.json'
import wakayama from './P11-10_30-jgd-g_BusStop.json'
import tottri from './P11-10_31-jgd-g_BusStop.json'
import shimane from './P11-10_32-jgd-g_BusStop.json'
import okayama from './P11-10_33-jgd-g_BusStop.json'
import hiroshima from './P11-10_34-jgd-g_BusStop.json'
import yamaguchi from './P11-10_35-jgd-g_BusStop.json'
import tokushima from './P11-10_36-jgd-g_BusStop.json'
import kagawa from './P11-10_37-jgd-g_BusStop.json'
import ehime from './P11-10_38-jgd-g_BusStop.json'
import kochi from './P11-10_39-jgd-g_BusStop.json'
import hukuoka from './P11-10_40-jgd-g_BusStop.json'
import saga from './P11-10_41-jgd-g_BusStop.json'
import nagasaki from './P11-10_42-jgd-g_BusStop.json'
import kumamoto from './P11-10_43-jgd-g_BusStop.json'
import oita from './P11-10_44-jgd-g_BusStop.json'
import miyazaki from './P11-10_45-jgd-g_BusStop.json'
import kagoshima from './P11-10_46-jgd-g_BusStop.json'
import okinawa from './P11-10_47-jgd-g_BusStop.json'

export {
  hokkaido,
  aomori,
  iwate,
  miyagi,
  akita,
  yamagata,
  hukushima,
  ibaraki,
  tochigi,
  gunma,
  saitama,
  chiba,
  tokyo,
  kanagawa,
  nigata,
  toyama,
  ishikawa,
  hukui,
  yamanashi,
  nagano,
  gihu,
  shizuoka,
  aichi,
  mie,
  shiga,
  kyoto,
  osaka,
  hyogo,
  nara,
  wakayama,
  tottri,
  shimane,
  okayama,
  hiroshima,
  yamaguchi,
  tokushima,
  kagawa,
  ehime,
  kochi,
  hukuoka,
  saga,
  nagasaki,
  kumamoto,
  oita,
  miyazaki,
  kagoshima,
  okinawa
}

export const hokkaidoBusStop = hokkaido.points

export type HokkaidoBusKey = keyof typeof hokkaidoBusStop

export const tohokuBusStop = {
  ...aomori.points,
  ...iwate.points,
  ...miyagi.points,
  ...akita.points,
  ...yamagata.points,
  ...hukushima.points,
}

export type TohokuBusKey = keyof typeof tohokuBusStop

export const kantoBusStop = {
  ...ibaraki.points,
  ...tochigi.points,
  ...gunma.points,
  ...saitama.points,
  ...chiba.points,
  ...tokyo.points,
  ...kanagawa.points,
}

export type KantoBusKey = keyof typeof kantoBusStop

export const hokurikuBusStop = {
  ...nigata.points,
  ...toyama.points,
  ...ishikawa.points,
  ...hukui.points,
  ...yamanashi.points,
  ...nagano.points,
}

export type HokurikuBusKey = keyof typeof hokurikuBusStop

export const tokaiBusStop = {
  ...gihu.points,
  ...shizuoka.points,
  ...aichi.points,
  ...mie.points,
}

export type TokaiBusKey = keyof typeof tokaiBusStop

export const kinkiBusStop = {
  ...shiga.points,
  ...kyoto.points,
  ...osaka.points,
  ...hyogo.points,
  ...nara.points,
  ...wakayama.points,
}

export type KinkiBusKey = keyof typeof kinkiBusStop

export const chugokuBusStop = {
  ...tottri.points,
  ...shimane.points,
  ...okayama.points,
  ...hiroshima.points,
  ...yamaguchi.points,
}

export type ChugokuBusKey = keyof typeof chugokuBusStop

export const shikokuBusStop = {
  ...tokushima.points,
  ...kagawa.points,
  ...ehime.points,
  ...kochi.points,
}

export type ShikokuBusKey = keyof typeof shikokuBusStop

export const kyushuBusStop = {
  ...hukuoka.points,
  ...saga.points,
  ...nagasaki.points,
  ...kumamoto.points,
  ...oita.points,
  ...miyazaki.points,
  ...kagoshima.points,
  ...okinawa.points
}

export type KyushuBusKey = keyof typeof kyushuBusStop

const busStop = {
  ...hokkaido.points,
  ...aomori.points,
  ...iwate.points,
  ...miyagi.points,
  ...akita.points,
  ...yamagata.points,
  ...hukushima.points,
  ...ibaraki.points,
  ...tochigi.points,
  ...gunma.points,
  ...saitama.points,
  ...chiba.points,
  ...tokyo.points,
  ...kanagawa.points,
  ...nigata.points,
  ...toyama.points,
  ...ishikawa.points,
  ...hukui.points,
  ...yamanashi.points,
  ...nagano.points,
  ...gihu.points,
  ...shizuoka.points,
  ...aichi.points,
  ...mie.points,
  ...shiga.points,
  ...kyoto.points,
  ...osaka.points,
  ...hyogo.points,
  ...nara.points,
  ...wakayama.points,
  ...tottri.points,
  ...shimane.points,
  ...okayama.points,
  ...hiroshima.points,
  ...yamaguchi.points,
  ...tokushima.points,
  ...kagawa.points,
  ...ehime.points,
  ...kochi.points,
  ...hukuoka.points,
  ...saga.points,
  ...nagasaki.points,
  ...kumamoto.points,
  ...oita.points,
  ...miyazaki.points,
  ...kagoshima.points,
  ...okinawa.points
}

export type BusStopKey = keyof typeof busStop

export default busStop
