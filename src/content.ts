/** Content of the book. Pure data — no DOM, no framework. */

export type Block =
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'toc' }
  /** Placeholder for an illustration. Drop a file in /illustrations and set `src`. */
  | { type: 'illo'; id: string; alt: string; src?: string; ratio?: number };

export interface RawPage {
  blocks: Block[];
}

/** Colour mood of a chapter — see the .theme-* rules in book.css. */
export type Theme = 'sun' | 'ice' | 'dawn' | 'honey' | 'ember' | 'lilac' | 'meadow' | 'rainbow' | 'twins';

export interface Chapter {
  title: string;
  /** Short label printed in the running header. */
  label: string;
  theme: Theme;
  pages: RawPage[];
}

export const bookTitle = 'ToploTeta in HladnoStric';
export const bookSubtitle = 'Kjer se ogenj sreča z ledom';

/** Pages before the first chapter: cover, title page, table of contents. */
export const frontMatter: RawPage[] = [
  {
    blocks: [
      { type: 'h1', text: bookTitle },
      { type: 'p', text: bookSubtitle },
      { type: 'illo', id: 'naslovnica', alt: 'Naslovnica: ToploTeta in HladnoStric z roko v roki', ratio: 1 },
    ],
  },
  {
    blocks: [
      { type: 'h1', text: bookTitle },
      { type: 'p', text: 'Pridruži se razigranim bitjem v svetu, kjer so objemi topli kot sonce, dogodivščine pa sveže kot prvi sneg.' },
    ],
  },
  { blocks: [{ type: 'h2', text: 'Kazalo' }, { type: 'toc' }] },
];

export const chapters: Chapter[] = [
  {
    title: 'Spoznaj ToploTeto',
    label: 'Spoznaj ToploTeto',
    theme: 'sun',
    pages: [
      {
        blocks: [
          { type: 'h1', text: 'Spoznaj ToploTeto' },
          { type: 'h2', text: 'Dišeča gospa z vrta' },
          { type: 'illo', id: 'toploteta-vrt', alt: 'ToploTeta na svojem cvetočem vrtu' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Nekje na robu mesta, v majhni, barviti hiški, je živela ToploTeta. Bila je prava gospodinja, ki je vedno dišala po sveže pečenih piškotih z maslom in po dišeči kavi. Njena lica so bila cvetoča, njeni lasje pa so bili kot zlati sončni žarki.' },
          { type: 'p', text: 'Njen najljubši hobi je bil vrtnarjenje. V njenem vrtu so uspevale najlepše rože in najbolj dišeča zelišča. Ko je stopila na vrt, so se zvončki veselo razcveteli pod njenimi podplati. Njena toplota je bila tako močna, da so se sosedom v hipu odtajali zamrzovalniki.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'ToploTeta je bila vedno dobre volje. Rada je pela pesmi o soncu in rožah, ko je zalivala svoje rastline. Njena hiša je bila vedno odprta za sosede in prijatelje. Vsak je bil dobrodošel, da se okrepča z dišečim čajem in sveže pečenimi piškoti.' },
          { type: 'p', text: 'Njena toplota ni bila le fizična. Imela je sposobnost, da z nežnim objemom ogreje premražena srca in prinese upanje. Ko je nekdo potreboval tolažbo, mu je ToploTeta podarila topel objem in nasmeh, ki je takoj pregnal slabo voljo.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'ToploTeta je bila resnično posebna. Bila je vir toplote, ljubezni in radosti za vse, ki so jo poznali. Njen dom je bil prostor, kjer sta se mešali toplina pečice in dišava sončnic.' },
          { type: 'p', text: 'In tisti, ki so jo srečali, so vedeli, da je toplina najboljša stvar na svetu, še posebej, če ti jo podari nekdo, ki te ima rad točno takšnega, kot si.' },
          { type: 'illo', id: 'toploteta-objem', alt: 'Topel objem, ki odtaja premraženo srce', ratio: 1.2 },
        ],
      },
    ],
  },
  {
    title: 'Spoznaj HladnoStrica',
    label: 'Spoznaj HladnoStrica',
    theme: 'ice',
    pages: [
      {
        blocks: [
          { type: 'h1', text: 'Spoznaj HladnoStrica' },
          { type: 'h2', text: 'Visok gospod z modrikastim nosom' },
          { type: 'illo', id: 'hladnostric-okno', alt: 'HladnoStric riše ledene rože na okno' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'V sosednji hiši, ki je bila čisto drugačno poglavje, je živel HladnoStric. Bil je visok, suhljat gospod z modrikastim nosom in obrvmi, na katerih so visele majhne ledene sveče. Njegov najljubši hobi je bil pihanje v vročo juho (da jo je spremenil v sladoled) in risanje ledenih rož na okna, ko so vsi drugi še sanjali o poletju.' },
          { type: 'p', text: 'Njegova polovica hiše je bila polna pingvinov in ledenih gora. Na njegovi strani so uspevale najlepše ledene rože, ki so se svetile pod lunino svetlobo. HladnoStric je bil vedno resen in redkobeseden. Raje je imel mir in tišino, ki jo je prinašal hladen zimski večer.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Njegova svežina ni bila le fizična. Imela je sposobnost, da ohladi pregrete glave in prinese mir v kaotičnih situacijah. Ko je nekdo potreboval jasnost, mu je HladnoStric podaril hladen vetrič in nasmeh, ki je takoj prinesel mir.' },
          { type: 'p', text: 'Njegov dom je bil prostor, kjer sta se mešali svežina noči in bleščava ledenih svečk. In tisti, ki so ga srečali, so vedeli, da je svežina najboljša stvar na svetu, še posebej, če ti jo podari nekdo, ki te ima rad točno takšnega, kot si.' },
        ],
      },
    ],
  },
  {
    title: 'Začetek',
    label: 'Začetek',
    theme: 'dawn',
    pages: [
      {
        blocks: [
          { type: 'h1', text: 'Začetek' },
          { type: 'p', text: 'Nekoč, v deželi, kjer se vreme ni moglo odločiti, ali bi nosilo puhovko ali kopalke, je živel nenavaden par: ToploTeta in HladnoStric.' },
          { type: 'illo', id: 'dezela', alt: 'Dežela, kjer se vreme ne more odločiti' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'ToploTeta je bila gospa cvetočih lic, ki je vedno dišala po sveže pečenem jabolčnem zavoju in topli prsti. Kamor koli je stopila, so pod njenimi podplati pognali zvončki, njeni objemi pa so bili tako močni, da so se sosedom v hipu odtajali zamrzovalniki.' },
          { type: 'p', text: 'HladnoStric pa je bil čisto drugo poglavje. Bil je visok, suhljat gospod z modrikastim nosom in obrvmi, na katerih so visele majhne ledene sveče. Njegov najljubši hobi je bil pihanje v vročo juho (da jo je spremenil v sladoled) in risanje ledenih rož na okna, ko so vsi drugi še sanjali o poletju.' },
        ],
      },
    ],
  },
  {
    title: 'Srečna ToploTeta in HladnoStric',
    label: 'Srečna ToploTeta in HladnoStric',
    theme: 'honey',
    pages: [
      {
        blocks: [
          { type: 'h1', text: 'Srečna ToploTeta in HladnoStric' },
          { type: 'p', text: 'V majhni hišici na robu mesta, ki je zdaj dišala po mešanici sveže pečenih piškotov in hrustljavega zimskega zraka, sta ToploTeta in HladnoStric živela svoje najsrečnejše dni. Njuna nekoč burna nesoglasja so se spremenila v nežno, igrivo melodijo vsakdana.' },
        ],
      },
      {
        blocks: [
          { type: 'illo', id: 'toploteta', alt: 'ToploTeta v svoji dišeči kuhinji', ratio: 815 / 445 },
          { type: 'p', text: 'Jutra so bila njun najljubši čas. ToploTeta je vstala prva in s svojim toplim dotikom prebudila kuhinjo. Na štedilniku je zabrbotala dišeča kava, v pečici pa so se zlato zapekali rogljički. Hiša se je napolnila z mehko, vabljivo toploto, ki je pregnala še zadnje ostanke nočnega hladu.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'HladnoStric se je prebudil ob vonju kave in se pretegnil, da so mu v sklepih rahlo zaprasketale ledene svečke. Stopil je v kuhinjo, kjer ga je teta pozdravila s širokim nasmehom in skodelico kave, ki se je kadila. On pa ji je v zameno podaril najlepšo ledeno rožo, ki jo je čez noč ustvaril na kuhinjskem oknu.' },
          { type: 'illo', id: 'hladnostric', alt: 'HladnoStric z ledeno rožo na oknu', ratio: 815 / 445 },
        ],
      },
      {
        blocks: [
          { type: 'p', text: '»Jutro, moja draga pečica,« je rekel in jo poljubil na lice, ki je bilo vedno toplo kot svež kruh.' },
          { type: 'p', text: '»Jutro, moj ljubi snežak,« mu je odvrnila in mu popravila šal.' },
          { type: 'illo', id: 'jutro', alt: 'Jutranji pozdrav v kuhinji', ratio: 1.2 },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Popoldneve sta preživljala na svojem vrtu, ki je bil zdaj pravi mali čudež narave. ToploTeta je skrbela za gredice, polne pisanih cvetlic in bujne zelenjave, ki so rasle pod njenimi ljubečimi, toplimi dlanmi. Paradižniki so bili rdeči in sladki, sončnice pa so segale do neba.' },
          { type: 'p', text: 'HladnoStric pa je imel svojo nalogo. Skrbel je za namakalni sistem, iz katerega je vedno pritekla sveža, kristalno čista in prijetno hladna voda. V najbolj vročih dneh je s svojimi hladnimi sapicami ustvarjal prijetno senco pod staro jablano, kjer sta si uredila kotiček za počitek.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Sosedje so z zavistjo opazovali njun vrt, kjer so jagode zorele ob robu majhnega, zaledenelega ribnika, v katerem so drsali majhni hrošči.' },
          { type: 'p', text: 'Večeri so bili čas za mir in tišino. ToploTeta je sedela v svojem najljubšem naslanjaču ob kaminu in pletla pisane, tople nogavice za vso sosesko. HladnoStric pa je sedel ob odprtem oknu, skozi katerega je vel svež nočni zrak, in bral knjigo o polarnih raziskovanjih. Občasno sta si izmenjala poglede, polne globoke naklonjenosti.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Nista potrebovala veliko besed. Njuna sreča ni bila v tem, da bi postala enaka. Njuna sreča je bila v tem, da sta se naučila ljubiti in ceniti tisto, kar je drugega delalo posebnega. ToploTeta je ljubila stričevo sposobnost, da ohladi pregrete glave in prinese svežino, HladnoStric pa je oboževal tetino moč, da ogreje premražena srca in prinese upanje.' },
          { type: 'p', text: 'V njuni hiši, kjer sta se mešala vonj po cimetu in svežina snega, sta ugotovila, da je prava sreča v ravnovesju. In v spoznanju, da je včasih najboljša stvar na svetu topel objem sredi mrzle zime ali pa osvežujoč vetrič na vroč poletni dan – še posebej, če ti ga podari nekdo, ki te ima rad točno takšnega, kot si.' },
        ],
      },
    ],
  },
  {
    title: 'Veliki prepir okoli termostata',
    label: 'Prepir okoli termostata',
    theme: 'ember',
    pages: [
      {
        blocks: [
          { type: 'h1', text: 'Veliki prepir okoli termostata' },
          { type: 'p', text: 'Njuna hiša je bila razdeljena na dve polovici. Na ToploTetini strani so uspevale banane, vaze so bile polne sončnic, ona pa je hodila naokoli v kratkih rokavih in veselo pela. Na HladnoStričevi strani pa so v dnevni sobi živeli pingvini, on pa je nosil tri pare volnenih nogavic in se pritoževal, da je »čisto prevroče«, če se je temperatura dvignila nad nulo.' },
        ],
      },
      {
        blocks: [
          { type: 'illo', id: 'vortex', alt: 'Vrtinec med toplim in hladnim zrakom', ratio: 815 / 445 },
          { type: 'p', text: '»HladnoStric!« je zavreščala ToploTeta nekega torka, ko je našla svojo najljubšo orhidejo zamrznjeno v kocki ledu. »Tvoj prepih mi uničuje tropski raj! Poglej moje lase, čisto naelektreni so od tvojega suhega zraka!«' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: '»ToploTeta!« je odvrnil stric in si popravil šal. »Tvoja vročina mi tali drsališče v hodniku! Moja najljubša ledena skulptura kure se je spremenila v lužo. To je neznosno!«' },
          { type: 'h2', text: 'Ko sta zamenjala vlogi' },
          { type: 'p', text: 'Odločila sta se za poskus. En dan bo vse po ToploTetino, naslednji dan pa vse po stričevo.' },
        ],
      },
      {
        blocks: [
          { type: 'list', items: [
            'Dan vročine: ToploTeta je navila gretje do konca. Vsi so bili preznojeni, čokolada se je spremenila v sirup, ljudje so postali zaspani in tečni. »Preveč vsega dobrega je preprosto ... preveč,« je priznala ToploTeta, ko ji je torta razpadla v gnjecavo maso.',
            'Dan mraza: HladnoStric je odprl vsa okna sredi zime. Vsi so drgetali, nosovi so postali rdeči kot paradižniki, nihče pa ni mogel držati skodelice čaja, ne da bi mu žvenketala v rokah. »Brez topline je življenje precej ... trdo,« je zamrmral stric skozi šklepetajoče zobe.',
          ] },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Modrost mešanice' },
          { type: 'p', text: 'Ugotovila sta, da svet potrebuje oba. Brez ToploTete ne bi bilo rasti, objemov in jagod. Brez HladnoStrica pa ne bi bilo osvežilnega spanca, hrustljavega snega in tistega miru, ki ga prinese hladen zimski večer.' },
          { type: 'p', text: 'Postala sta mojstra Ravnovesja.' },
          { type: 'list', items: [
            'ToploTeta je strica naučila, da je vroč objem včasih boljši od ledene kocke v pijači.',
            'HladnoStric je teto naučil, da hladna glava reši več težav kot vroča kri.',
          ] },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Danes v njuni hiši (in v naravi) vlada red. Ko teta preveč razgreje ozračje, stric malo pihne. Ko stric preveč zamrzne srca, teta prinese toplo odejo in nasmeh.' },
          { type: 'p', text: 'Nauk za otroke: Ne jezi se na zimo, ko te zebe v prste, in ne preklinjaj poletja, ko se potiš. Vsaka stvar ima svoj namen.' },
          { type: 'p', text: 'Nauk za odrasle: Odnosi so kot termostat – če eden preveč »kuri«, mora drugi znati »ohladiti«, da hiša ne pogori ali pa popolnoma zamrzne.' },
          { type: 'illo', id: 'termostat', alt: 'Termostat med vročino in ledom', ratio: 1.4 },
        ],
      },
    ],
  },
  {
    title: 'Veliki prepih v omari',
    label: 'Prepih v omari',
    theme: 'lilac',
    pages: [
      {
        blocks: [
          { type: 'h1', text: 'Veliki prepih v omari' },
          { type: 'p', text: 'Prišel je marec, mesec, ko se narava prebuja, ToploTeta pa dobi neustavljivo željo po pospravljanju. »Stric! Čas je, da prezračiva hišo in pospraviva zimske plašče!« je vzkliknila in na široko odprla vsa okna.' },
          { type: 'p', text: 'HladnoStric je le tesneje zavil svoj šal okoli vratu. »Pospraviti plašče? Pa saj se prava sezona zmrzali šele začenja! Moje najljubše ledene kocke v zamrzovalniku potrebujejo družbo.«' },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Bitka z volno in svilo' },
          { type: 'p', text: 'ToploTeta je začela na kup metati volnene nogavice, težke odeje in podložene hlače. »Vse to gre v klet! Hočem lahkotnost, hočem svilo, hočem kratke hlače!« je pela in s svojo toplino povzročila, da so se v kotu sobe začele potiti celo stenske slike.' },
          { type: 'p', text: 'Stric pa ni popustil. Vsakič, ko je teta odložila kup poletnih oblek na posteljo, je on šel mimo in nanje »rahlo pihnil«. V trenutku so bile kopalke trde kot karton, sončna očala pa zamrznjena.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: '»Stric, to ni smešno! Moje japonke so ravnokar počile, ker si jih spremenil v ledenke!« je jezno rekla teta.' },
          { type: 'p', text: '»In tvoja vročina mi uničuje molje!« se je pritožil stric. »Moji molji imajo radi hladno volno, ti pa jih pečeš kot v savni!«' },
          { type: 'illo', id: 'omara', alt: 'Omara, do vrha polna volne in svile', ratio: 1.2 },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Vremenski vrtinec v dnevni sobi' },
          { type: 'p', text: 'Zatopljena v prepir nista opazila, da njuna čustva že vplivajo na zrak v hiši. Ker je bila teta »vroča od jeze«, stric pa »hladen kot špricar«, se je sredi dnevne sobe začelo dogajati nekaj nenavadnega.' },
          { type: 'p', text: 'Topel zrak s tetine strani se je srečal z mrzlim zrakom s stričeve strani. Najprej je le rahlo zapihalo, nato pa se je sredi preproge ustvaril pravi mali tornado!' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: '»Najini plašči!« je zavpila ToploTeta, ko je videla, kako njena najljubša poletna obleka kroži pod stropom skupaj s stričevo rusko kučmo.' },
          { type: 'p', text: '»Moje drsalke!« je zavpil stric, ko jih je vrtinec odnesel mimo njegove glave.' },
          { type: 'p', text: 'Hiša je postala poligon za leteče predmete. Blazine so letele kot oblaki, nogavice so švigale kot strele. Bila sta sredi lastne nevihte, ki sta jo zakuhala s trmo.' },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Skupni »izklop« nevihte' },
          { type: 'p', text: '»Stric, ustavi se!« je zavpila teta in se prijela za nogo mize. »Preveč pihaš!«' },
          { type: 'p', text: '»Jaz? Ti greješ kot podivjan radiator!« ji je vrnil stric, medtem ko je lovil svojo kapo.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Ugotovila sta, da se vrtinec ne bo ustavil, dokler se eden od njiju ne umiri. HladnoStric je globoko vdihnil, zaprl oči in si predstavljal miren, negiben ledenik. ToploTeta je položila roko na njegovo ramo in si predstavljala nežen zahod sonca, ki počasi ugaša.' },
          { type: 'p', text: 'Nevihta se je v trenutku polegla. Obleke so popadale po tleh – stričev plašč je pristal na teti, njeno krilo pa na stričevi glavi.' },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Nauk o pospravljanju' },
          { type: 'p', text: 'Smejala sta se tako močno, da so se iz soseske slišali odmevi. Ugotovila sta, da spomladansko čiščenje ne pomeni, da moraš vse staro vreči stran ali vse novo takoj uveljaviti.' },
          { type: 'p', text: 'ToploTeta je priznala, da je dobro imeti kakšen topel plašč pri roki, če marec »stisne«. HladnoStric pa je ugotovil, da je lažje pospravljati, če nimaš prstov čisto otopelih od mraza.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Tisti dan sta skupaj zložila perilo. Polovica omare je bila volnena, polovica svilena. In ko sta končala, sta si privoščila vročo čokolado s kepico sladoleda – popolno mešanico njunih svetov.' },
          { type: 'illo', id: 'cokolada', alt: 'Vroča čokolada s kepico sladoleda', ratio: 1.2 },
        ],
      },
    ],
  },
  {
    title: 'Operacija Popolni Piknik',
    label: 'Operacija Popolni Piknik',
    theme: 'meadow',
    pages: [
      {
        blocks: [
          { type: 'h1', text: 'Operacija Popolni Piknik' },
          { type: 'p', text: 'Soseska se je bližala velikemu dogodku – vsakoletnemu pikniku, in letos je bil red, da ga organizirata ToploTeta in HladnoStric. To je bil dogodek, ki so se ga vsi veselili, a hkrati tudi malce bali. Bi bila vsa hrana stopljena ali zamrznjena? Bi sosedje dobili opekline ali ozebline?' },
        ],
      },
      {
        blocks: [
          { type: 'illo', id: 'piknik', alt: 'Soseska na vsakoletnem pikniku', ratio: 815 / 445 },
          { type: 'p', text: 'Priprave so se začele en teden prej. »Piknik potrebuje vzdušje, stric!« je oznanila ToploTeta in raznašala vabila, oblečena v barve mavrice. »Potrebujemo sonce, rože, ples pod zvezdami in pijačo, ki diši po meti!«' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'HladnoStric je samo zmajeval z glavo in si popravljal ovratnik, ki mu je segal do ušes. »Ne, teta. Piknik potrebuje osvežitev. Kdo si želi plesati v vročini? Ljudje potrebujejo hladen veter, leden čaj in mogoče celo majhno kepanje!«' },
          { type: 'p', text: '»Kepanje sredi poletja? Ti si nor!« se je zasmejala. »Ljudje bodo zmrznili!«' },
          { type: 'p', text: '»In tvoji bodo zboleli od vročine!« je odvrnil.' },
          { type: 'p', text: 'A ker sta se o Ravnovesju že marsikaj naučila, sta sklenila kompromis.' },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Veliki dan' },
          { type: 'p', text: 'Piknik se je začel v čudovitem, toplem popoldnevu. ToploTeta je poskrbela, da je sonce sijalo ravno prav. Ni žgalo, le nežno je božalo. Trava je bila mehka in topla, sosedje so sedeli na pisanih odejah in si brisali pot z obrazov.' },
          { type: 'p', text: 'Nato je na vrsto prišel HladnoStric. Ko je videl, da postaja sosedom rahlo vroče, je narahlo tlesknil s prsti in priklical najslajšo osvežitev – rahel gorski prepih, ki je zapihal ravno v trenutku, ko je nekdo pomislil: »Oh, kako prav bi zdaj prišlo malo hladu.«' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Sosedje so ga navdušeno pozdravili: »Bravo, HladnoStric! To je bila tista osvežitev, ki smo jo potrebovali!« Teta ga je pogledala in se mu nasmehnila, čeprav jo je malce zbodlo v ponos, da so ljudje navdušeni nad hladom.' },
          { type: 'p', text: 'A teta je imela aduta v rokavu – hrano. Njena stran mize je bila polna vroče, sočne pice s pečice, toplih piškotov in pečenega mesa, ki je kar vabilo z vonjem. »Prosim, postrezite se! Vroče je najboljše!« je vabila sosede.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'A HladnoStric je imel svoj adut. Njegova stran mize je bila polna popolnoma ohlajene lubenice, sladoleda z vsemi možnimi prelivi in pijač z ledom, ki se sploh ni topil. »Seveda, vroča pica je dobra, ampak kdor si želi resnične osvežitve ...« je začel, ko je na mizo položil ledeno torto.' },
          { type: 'p', text: 'Sosedje so bili razdeljeni. Nekateri so posegali po topli pici, drugi po sladoledu. Na koncu pa so vsi ugotovili, da je najboljša kombinacija: kos tople pice in kepica hladnega sladoleda za sladico.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Ko se je večerilo in je ToploTetino sonce počasi zahajalo, je postalo hladno. A preden bi se ljudje začeli tresti, je ToploTeta prižgala velikanski ogenj in razdelila tople odeje. Sosedje so se stisnili k ognju, greli roke nad plameni in uživali v svežini noči, ki jo je prinašal HladnoStric.' },
          { type: 'illo', id: 'ogenj', alt: 'Sosedje ob velikem ognju pod zvezdami', ratio: 1.4 },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Nauk piknika' },
          { type: 'p', text: 'Piknik je bil popoln uspeh. Ljudje so ugotovili, da je življenje najboljše, ko sta oba elementa prisotna – toplina, ki te ogreje, ko si osamljen, in hlad, ki te osveži, ko ti je pretežko.' },
          { type: 'p', text: 'ToploTeta in HladnoStric sta se tisti večer objela, stric se je nasmehnil (kar je bilo zelo redko) in ToploTeta je vedela, da je njuna drugačnost pravzaprav njuna supermoč.' },
        ],
      },
    ],
  },
  {
    title: 'Čudež v lončku',
    label: 'Čudež v lončku',
    theme: 'rainbow',
    pages: [
      {
        blocks: [
          { type: 'h1', text: 'Čudež v lončku' },
          { type: 'h2', text: 'Kako sta ToploTeta in HladnoStric dobila otroka' },
          { type: 'p', text: 'Življenje ToploTete in HladnoStrica je bilo po vseh preizkušnjah mirno in polno ljubezni. Njuna hiša je bila popolno ravnovesje med toplo pečico in svežim prepihom. A kljub vsemu zadovoljstvu, ki sta ga čutila ob urejanju vrta in kuhanju, je v njunih srcih rasla tiha, a močna želja.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Želela sta si nekoga, s komer bi lahko delila to čudovito ravnovesje. Želela sta si otroka.' },
          { type: 'p', text: '»Teta,« je rekel stric nekega večera, ko sta sedela na kavču in opazovala, kako se njune mačke igrajo na preprogi. »Nekaj manjka. Najina ljubezen je močna, a zdi se mi, da bi jo lahko dala še nekomu.«' },
          { type: 'p', text: 'Teta ga je pogledala z vlažnimi očmi. »O, stric. Točno to sem mislila. Kako čudovito bi bilo slišati otroški smeh v tej hiši.«' },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Recept za čudež' },
          { type: 'p', text: 'Toda kako bi dobila otroka, ki bi bil popolna mešanica njunih svetov? Nista mogla preprosto oditi v trgovino in ga kupiti. Morala sta ga ustvariti – z ljubeznijo, magijo in kančkom tistega, kar ju je delalo posebna.' },
          { type: 'p', text: 'Odločila sta se, da bosta otroka »vzgojila« na vrtu, na tisti posebni točki, kjer se je tetina toplota srečala s stričevim hladom.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Tetina sestavina: Teta je prinesla velikanski keramični lonec, ki ga je pobarvala v barve mavrice. Vanj je dala najboljšo, toplo in plodno prst s svojega vrta. Prsti je dodala še tri kapljice svojega najbolj toplega objema in peščico semen najbolj dišečih sončnic.' },
          { type: 'p', text: 'Stričeva sestavina: Stric je prinesel majhno, a svetlečo se kristalno kocko ledu, ki je nikoli ni stalila nobena vročina. Položil jo je v prst in ji dodal tri kapljice svojega najbolj svežega, jutranjega prepiha ter peščico semen najbolj trpežnih gorskih cvetlic.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Skupna sestavina: Skupaj sta lonec postavila na tisto točko na vrtu, kjer je sonce sijalo ravno prav in kjer je vetrič pihal ravno prav. Teta je vsak dan nežno božala lonec in mu pela pesmi o rasti in toplini, stric pa ga je vsak dan rahlo pohladil in mu pripovedoval zgodbe o kristalnih ledenikih in svežih nočeh.' },
          { type: 'illo', id: 'lonec', alt: 'Mavrični lonec na vrtu, med soncem in senco', src: 'illustrations/lonec.jpg', ratio: 1.25 },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Rojstvo malega ravnovesja' },
          { type: 'p', text: 'Teden za tednom sta skrbela za lonec. In potem, nekega jutra, se je zgodilo. Ko sta teta in stric prišla na vrt, sta videla, da je iz prsti pognal majhen, a močan kalček. Ni bil zelen, ampak mešanica zlate in modre barve.' },
          { type: 'p', text: 'Kalček je rasel in se razvijal, dokler se ni iz njega razvil čudovit, majhen cvet s cvetnimi listi, ki so bili toplo rdeči, a so se na koncih svetili modro. V sredini cveta pa je ležalo majhno, speče bitje.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Zaslišala sta nežen, zvonek glas – kot bi se mešala zvončkov smeh in kristalno tleskanje. Bitje se je prebudilo, odprlo velike, sijoče oči (eno modro, eno zlato) in se jima nasmehnilo.' },
          { type: 'illo', id: 'jasa', alt: 'Majhno bitje v sredini cveta', ratio: 1.2 },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Predlog za ime' },
          { type: 'p', text: 'Teta in stric sta bila presrečna. Deklica je bila popolna mešanica njunih svetov – topla in ljubeča kot teta, a sveža in jasna kot stric. Njeni lasje so bili kot zlati sončni žarki, njeni prsti pa so bili hladni in hrustljavi.' },
          { type: 'p', text: 'Ko sta jo prinesla v hišo, se je temperatura v vseh prostorih takoj izravnala. Ni bilo več vročih kotičkov ali mrzlih prepihov. Vse je bilo ravno prav.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Sedela sta na kavču in jo opazovala, ko je zaspala v njunem objemu.' },
          { type: 'p', text: '»Kako jo bova poimenovala?« je vprašala teta.' },
          { type: 'p', text: 'Stric je globoko vdihnil in se nasmehnil. »V sebi nosi najlepše od naju. Toplino sonca in svežino ledu. V sebi nosi mir in jasnost.«' },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Jasa!' },
          { type: 'p', text: 'To ime pomeni odprt, svetel prostor v gozdu, kjer sonce sije ravno prav, a je hkrati varno in mirno. Jasa je popolna mešanica svetlobe in sence, toplote in hladu – točno tako kot njun mali čudež.' },
          { type: 'p', text: 'In tako so živeli ToploTeta, HladnoStric in mala Jasa, v hiši, kjer je bila ljubezen vedno ravno prav.' },
        ],
      },
    ],
  },
  {
    title: 'Dvojni čudež',
    label: 'Dvojni čudež',
    theme: 'twins',
    pages: [
      {
        blocks: [
          { type: 'h1', text: 'Dvojni čudež' },
          { type: 'h2', text: 'Kako sta ToploTeta in HladnoStric dobila dvojčka' },
          { type: 'p', text: 'Življenje ToploTete in HladnoStrica je bilo polno ljubezni in popolnega ravnovesja. Njuna hiša je bila topla in dišeča, vrt pa poln barv in svežega zraka. A kljub vsemu zadovoljstvu je v njunih srcih rasla tiha, a močna želja.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Želela sta si nekoga, s komer bi lahko delila to čudovito ravnovesje. Želela sta si otroka.' },
          { type: 'p', text: '»Teta,« je rekel stric nekega večera, ko sta sedela na kavču in opazovala, kako se njune mačke igrajo na preprogi. »Najina ljubezen je močna, a zdi se mi, da bi jo lahko dala še nekomu. Kako čudovito bi bilo slišati otroški smeh v tej hiši.«' },
          { type: 'p', text: 'Teta ga je pogledala z vlažnimi očmi in ga močno objela. »O, stric. Točno to sem mislila. Kako čudovito bi bilo.«' },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Skrivnostni recept za dvojčka' },
          { type: 'p', text: 'Ker sta bila ToploTeta in HladnoStric ustvarjena iz naravnih elementov, sta vedela, da njun otrok ne bo prišel na običajen način. Morala sta ga »vzgojiti« z ljubeznijo, magijo in kančkom tistega, kar ju je delalo posebna.' },
          { type: 'p', text: 'Nekega jutra sta na vrtu našla tisto posebno točko, kjer se je tetina toplota srečala s stričevim hladom. Lonec, ki sta ga pobarvala v barve mavrice, sta napolnila z najboljšo, plodno prstjo s svojega vrta.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Teta je v prst položila majhno, rdečo keramično kocko, ki je bila vedno topla na dotik. Prsti je dodala še tri kapljice svojega najbolj toplega objema in peščico semen najbolj rdečih sončnic.' },
          { type: 'p', text: 'Stric pa je v prst položil majhno, modro kristalno kocko ledu, ki je nikoli ni stalila nobena vročina. Prsti je dodal še tri kapljice svojega najbolj svežega, jutranjega prepiha in peščico semen najbolj trpežnih gorskih cvetlic.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Skupaj sta lonec postavila na tisto točko na vrtu, kjer je sonce sijalo ravno prav in kjer je vetrič pihal ravno prav. Teta je vsak dan nežno božala lonec in mu pela pesmi o rasti in toplini, stric pa ga je vsak dan rahlo pohladil in mu pripovedoval zgodbe o kristalnih ledenikih in svežih nočeh.' },
          { type: 'illo', id: 'dva-kalcka', alt: 'Dva kalčka v mavričnem loncu – en zlat, en moder', ratio: 1.2 },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Rojstvo Topline in Svežine' },
          { type: 'p', text: 'Teden za tednom sta skrbela za lonec. In potem, nekega jutra, se je zgodilo. Ko sta teta in stric prišla na vrt, sta videla, da sta iz prsti pognala dva majhna kalčka.' },
          { type: 'p', text: 'En kalček je bil topel na dotik in se je svetil v zlatih in rdečih odtenkih. Rasel je in se razvil v čudovit, majhen cvet z mehkimi, toplimi cvetnimi listi. V sredini cveta je ležalo majhno, speče bitje.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Zaslišala sta nežen, zvonek glas – kot bi se mešala zvončkov smeh in kristalno tleskanje. Bitje se je prebudilo, odprlo velike, sijoče zlato-modre oči in se jima nasmehnilo. Bil je fantek, in ko ga je teta prijela v naročje, je začutila njegovo neverjetno toplino. Njegovi lasje so bili kot zlati sončni žarki, njegovi prsti pa so bili toplo rdeči.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Drugi kalček je bil hladen na dotik in se je svetil v modrih in srebrnih odtenkih. Rasel je in se razvil v čudovit, majhen cvet s hrustljavimi, hladnimi cvetnimi listi. V sredini cveta je ležalo majhno, speče bitje.' },
          { type: 'p', text: 'Tudi to bitje se je prebudilo, odprlo velike, sijoče zlato-modre oči in se jima nasmehnilo. Bila je punčka, in ko jo je stric prijel v naročje, je začutil njeno neverjetno svežino. Njeni lasje so bili kot kristalne ledene svečke, njeni prsti pa so bili hladno modri.' },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Predlog za ime' },
          { type: 'p', text: 'Teta in stric sta bila presrečna. Imela sta dvojčka, ki sta bila popolna dopolnitev njunega ravnovesja.' },
          { type: 'p', text: 'Fantek je bil topel po mami, prinašal je toplino, ljubezen in energijo v njun dom. Njegova prisotnost je bila kot topel objem sredi mrzle zime.' },
          { type: 'p', text: 'Punčka je bila hladna po očetu, prinašala je mir, jasnost in svežino v njun dom. Njena prisotnost je bila kot osvežujoč vetrič sredi vročega poletnega dne.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'Skupaj sta sedela na kavču in ju opazovala, ko sta zaspala v njunem objemu.' },
          { type: 'p', text: '»Kako ju bova poimenovala?« je vprašala teta.' },
          { type: 'p', text: 'Stric je globoko vdihnil in se nasmehnil. »V sebi nosita najlepše od naju. Toplino sonca in svežino ledu. V sebi nosita mir in jasnost.«' },
        ],
      },
      {
        blocks: [
          { type: 'h2', text: 'Jara in Jasna' },
          { type: 'p', text: 'Jara pomeni svežino, mladost in toplino spomladanskega sonca. Polno je energije in radosti, točno tako kot njun mali, topli fantek.' },
          { type: 'p', text: 'Jasna pomeni jasnost, čistost in mir. Polno je svežine in svetlobe, točno tako kot njuna mala, hladna punčka.' },
        ],
      },
      {
        blocks: [
          { type: 'p', text: 'In tako so živeli ToploTeta, HladnoStric, mali Jara in mala Jasna, v hiši, kjer je bila ljubezen vedno ravno prav.' },
          { type: 'illo', id: 'druzina', alt: 'Družina pred hišo, pol v soncu, pol v snegu', ratio: 1.2 },
        ],
      },
    ],
  },
];

/** Pages after the last chapter. */
export const backMatter: RawPage[] = [
  {
    blocks: [
      { type: 'h1', text: 'Konec' },
      { type: 'p', text: 'Pa sta živela srečno do konca svojih dni – ona topla, on hladen, oba pa ravno prav.' },
    ],
  },
];
