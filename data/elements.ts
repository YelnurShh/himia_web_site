import type { Element } from '@/types';
import pubchem from './pubchem-elements.json';
import { elementLocalization } from './element-localization';
// number|symbol|Kazakh name|mass|category|group|period|configuration|use|fact
const rows = `1|H|Сутек|1.008|Бейметалл|1|1|1s¹|Аммиак өндірісі мен отын элементтері|Ғаламдағы ең көп таралған элемент
2|He|Гелий|4.003|Инертті газ|18|1|1s²|МРТ магниттерін салқындату|Күнде алғаш анықталған
3|Li|Литий|6.94|Сілтілік металл|1|2|[He] 2s¹|Аккумуляторлар|Ең жеңіл металл
4|Be|Бериллий|9.012|Сілтілік-жер металл|2|2|[He] 2s²|Аэроғарыш қорытпалары|Бериллий шаңы улы
5|B|Бор|10.81|Металлоид|13|2|[He] 2s² 2p¹|Боросиликат шыны|Ыстыққа төзімді шыны құрамында бар
6|C|Көміртек|12.011|Бейметалл|14|2|[He] 2s² 2p²|Органикалық қосылыстар мен графит|Алмаз бен графит осы элементтен тұрады
7|N|Азот|14.007|Бейметалл|15|2|[He] 2s² 2p³|Тыңайтқыш өндірісі|Ауаның шамамен 78%-ын құрайды
8|O|Оттек|15.999|Бейметалл|16|2|[He] 2s² 2p⁴|Медицина мен металлургия|Тыныс алу үшін қажет
9|F|Фтор|18.998|Галоген|17|2|[He] 2s² 2p⁵|Тіс пастасындағы фторидтер|Ең электртеріс элемент
10|Ne|Неон|20.180|Инертті газ|18|2|[He] 2s² 2p⁶|Жарық белгілері|Түтік ішінде қызғылт сары жарық береді
11|Na|Натрий|22.990|Сілтілік металл|1|3|[Ne] 3s¹|Ас тұзы құрамында|Бос күйінде сумен белсенді әрекеттеседі
12|Mg|Магний|24.305|Сілтілік-жер металл|2|3|[Ne] 3s²|Жеңіл қорытпалар|Хлорофилл ортасында магний ионы бар
13|Al|Алюминий|26.982|Металл|13|3|[Ne] 3s² 3p¹|Қаптама мен ұшақ жасау|Бетінде қорғаныш оксид қабаты түзіледі
14|Si|Кремний|28.085|Металлоид|14|3|[Ne] 3s² 3p²|Микрочип пен күн батареясы|Жер қыртысында мол кездеседі
15|P|Фосфор|30.974|Бейметалл|15|3|[Ne] 3s² 3p³|Тыңайтқыштар|ДНҚ құрамына кіреді
16|S|Күкірт|32.06|Бейметалл|16|3|[Ne] 3s² 3p⁴|Күкірт қышқылын өндіру|Табиғатта бос күйінде де кездеседі
17|Cl|Хлор|35.45|Галоген|17|3|[Ne] 3s² 3p⁵|Суды залалсыздандыру|Ас тұзындағы хлор ион түрінде болады
18|Ar|Аргон|39.948|Инертті газ|18|3|[Ne] 3s² 3p⁶|Дәнекерлеудегі қорғаныш газ|Ауада шамамен 0.93% бар
19|K|Калий|39.098|Сілтілік металл|1|4|[Ar] 4s¹|Тыңайтқыштар|Жүйке импульсі үшін маңызды
20|Ca|Кальций|40.078|Сілтілік-жер металл|2|4|[Ar] 4s²|Цемент пен сүйек құрамында|Тіс пен сүйекте көп
21|Sc|Скандий|44.956|Ауыспалы металл|3|4|[Ar] 3d¹ 4s²|Жеңіл қорытпалар|Сирек жер металдарына ұқсайды
22|Ti|Титан|47.867|Ауыспалы металл|4|4|[Ar] 3d² 4s²|Импланттар мен ұшақтар|Берік әрі жеңіл
23|V|Ванадий|50.942|Ауыспалы металл|5|4|[Ar] 3d³ 4s²|Болатты беріктендіру|Қосылыстары түрлі түсті
24|Cr|Хром|51.996|Ауыспалы металл|6|4|[Ar] 3d⁵ 4s¹|Тот баспайтын болат|Металл бетіне жылтыр қабат береді
25|Mn|Марганец|54.938|Ауыспалы металл|7|4|[Ar] 3d⁵ 4s²|Болат өндірісі|Кей ферменттердің құрамында бар
26|Fe|Темір|55.845|Ауыспалы металл|8|4|[Ar] 3d⁶ 4s²|Құрылыс пен қан гемоглобині|Жер ядросының негізгі элементтерінің бірі
27|Co|Кобальт|58.933|Ауыспалы металл|9|4|[Ar] 3d⁷ 4s²|Магниттер мен аккумуляторлар|B₁₂ дәруменінің құрамында бар
28|Ni|Никель|58.693|Ауыспалы металл|10|4|[Ar] 3d⁸ 4s²|Қорытпалар мен аккумуляторлар|Тот баспайтын болат құрамына қосылады
29|Cu|Мыс|63.546|Ауыспалы металл|11|4|[Ar] 3d¹⁰ 4s¹|Электр сымдары|Электрді өте жақсы өткізеді
30|Zn|Мырыш|65.38|Ауыспалы металл|12|4|[Ar] 3d¹⁰ 4s²|Болатты мырыштау|Қорғаныш қабат тоттануды азайтады`;
const firstThirty:Element[]=rows.split('\n').map(row=>{const [n,symbol,name,atomicMass,category,g,p,electronConfiguration,usage,interestingFact]=row.split('|');const atomicNumber=Number(n),group=Number(g),period=Number(p);return {atomicNumber,symbol,name,atomicMass,category,group,period,electronConfiguration,usage,interestingFact,description:`${name} — периодтық жүйедегі ${atomicNumber}-элемент. ${period}-период, ${group}-топқа жатады.`,x:group,y:period};});
const categories:Record<string,string>={
  'Actinide':'Актиноид','Alkali metal':'Сілтілік металл','Alkaline earth metal':'Сілтілік-жер металл',
  'Halogen':'Галоген','Lanthanide':'Лантаноид','Metalloid':'Металлоид','Noble gas':'Инертті газ',
  'Nonmetal':'Бейметалл','Post-transition metal':'Металл','Transition metal':'Ауыспалы металл'
};
function position(n:number):{group:number|null;period:number;x:number;y:number}{
  if(n<=2){const group=n===1?1:18;return {group,period:1,x:group,y:1};}
  if(n<=10){const group=n<=4?n-2:n+8;return {group,period:2,x:group,y:2};}
  if(n<=18){const group=n<=12?n-10:n;return {group,period:3,x:group,y:3};}
  if(n<=36){const group=n-18;return {group,period:4,x:group,y:4};}
  if(n<=54){const group=n-36;return {group,period:5,x:group,y:5};}
  if(n<=57){const group=n-54;return {group,period:6,x:group,y:6};}
  if(n<=71)return {group:null,period:6,x:n-54,y:9};
  if(n<=86){const group=n-68;return {group,period:6,x:group,y:6};}
  if(n<=89){const group=n-86;return {group,period:7,x:group,y:7};}
  if(n<=103)return {group:null,period:7,x:n-86,y:10};
  const group=n-100;return {group,period:7,x:group,y:7};
}
const superscripts:Record<string,string>={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
function formatConfiguration(value:string){return value.replace(/([spdf])(\d+)/g,(_,orbital:string,power:string)=>orbital+[...power].map(d=>superscripts[d]).join('')).replace(/\](?=\d)/,'] ').replace(' (predicted)',' (болжамды)').replace(' (calculated)',' (есептелген)');}
const additional:Element[]=pubchem.slice(30).map(source=>{const local=elementLocalization.get(source.number);if(!local)throw new Error(`Қазақша атау жоқ: ${source.number}`);const place=position(source.number),category=categories[source.groupBlock]||'Металл';const description=`${local.name} — периодтық жүйедегі ${source.number}-элемент. ${place.period}-периодтың ${category.toLocaleLowerCase('kk')} санатына жатады${place.group?`, ${place.group}-топта орналасқан`:', f-блок қатарында орналасқан'}.`;const interestingFact=source.yearDiscovered==='Ancient'?'Ежелден белгілі элемент':`${source.yearDiscovered} жылы ашылған элемент`;return {atomicNumber:source.number,symbol:source.symbol,name:local.name,atomicMass:source.atomicMass,category,group:place.group,period:place.period,electronConfiguration:formatConfiguration(source.electronConfiguration),description,usage:local.usage,interestingFact,x:place.x,y:place.y};});
export const elements:Element[]=[...firstThirty,...additional];
export function dailyElement(date=new Date()){const kazakhstanDate=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Almaty',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);const day=Math.floor(Date.parse(`${kazakhstanDate}T00:00:00Z`)/86400000);return elements[((day%elements.length)+elements.length)%elements.length];}
