/* Order of Service: transcribed verbatim from the Burial Program (Version 3).
   English text is presented as the primary reading; the Yoruba parallel text
   printed alongside each item in the program is preserved in full below. */

const SERVICE_INFO = {
  church: "St. Paul's Cathedral Church, Iyara",
  diocese: "Diocese of Ijumu, Church of Nigeria, Anglican Communion",
  deceasedDate: "23rd September, 2026",
  serviceDate: "Friday, 6th November 2026",
  officiants: [
    { role: "Organist", name: "Mr. Alaba Bakare" },
    { role: "Pastor Warden", name: "Mrs. Yetunde Davies" },
    { role: "Choir Mistress", name: "Mrs. J. T. Ajayi" },
    { role: "Vicar's Warden", name: "Mrs. C. O. Jonah" },
    { role: "", name: "Rev. S. O. Onipede" },
    { role: "", name: "Canon S. O. Alemidan" },
    { role: "Assisting Priest", name: "The Rt. Revd. Prof. P. O. Ojo Ph.D" },
    { role: "Archdeacon of the Cathedral", name: "Ven. D. S. Abiodun" }
  ],
  churchNeeds: [
    "Computer system and photocopy machine",
    "Big Generator",
    "Choir Robe (White and Purple)"
  ]
};

const ORDER_OF_SERVICE = [
  {
    num: 1,
    title: "Receiving of the Body",
    sub: "Gbigba Oku ni Enu Ona",
    body: [
      { type: "p", text: "The ministers shall meet the body at the entrance of the church." },
      { type: "liturgy", speaker: "Priest", text: "In the name of God the Father, the Son and the Holy Spirit." },
      { type: "liturgy", speaker: "People", text: "Amen." },
      { type: "p", text: "The congregation will stand." },
      { type: "liturgy", speaker: "Priest", text: "With faith in Jesus Christ, we receive the body of our beloved one, Late Pa. Wesley Olajide Ojo Aiyegboka, for burial. Let us pray with confidence in God, the Giver of Life, that He may raise her unto perfection in the company of saints." },
      { type: "p", text: "(Perfect silence, after which the priest says)" },
      { type: "liturgy", speaker: "Priest", text: "Deliver your servant, Late Pa. Wesley Olajide Ojo Aiyegboka sovereign Lord from all evils and set her free from every bond that she may rest with all saints in eternal habitation, where with the Father and the Holy Spirit live and reign, one God forever and ever." },
      { type: "liturgy", speaker: "People", text: "Amen." },
      { type: "liturgy", speaker: "Priest", text: "Rest eternal, grant unto her O Lord." },
      { type: "liturgy", speaker: "People", text: "And let perpetual light shine upon her." },
      { type: "liturgy", speaker: "Priest", text: "I have set the Lord always before me, for He is at my right hand, therefore I shall not be moved." },
      { type: "liturgy", speaker: "People", text: "Wherefore my heart was glad, and my glory rejoices. My flesh also shall rest in hope." },
      { type: "liturgy", speaker: "Priest", text: "You will not leave my soul in hell; neither shall you suffer your holy one to see corruption." },
      { type: "liturgy", speaker: "People", text: "You shall show me the path of life, in your presence is the fullness of joy and at your right hand there are pleasure for evermore." },
      { type: "liturgy", speaker: "Priest", text: "Rest eternal grant unto her, O Lord." },
      { type: "liturgy", speaker: "People", text: "And let perpetual light shine upon her." }
    ],
    yoruba: [
      "GBIGBA OKU NI ENU ONA",
      "Awon Alufa yio pade oku ni enu ona ile Olorun. Alufa: Ni oruko Olorun Baba, ati niti Omo ati niti Emi Mimo. Ijo: Amin.",
      "Gbogbo eniyan yio dide. Alufa: Ni igbagbo ninu Jesu Kristi awa gba ara baba wa Late Pa. Wesley Olajide Ojo Aiyegboka fun isinku. E je ki a gbadura pelu igboya ninu Olorun olufunni ni isinmi, wipe ou yio ji iya wa yi dide kuro ninu oku pelu awon eniyan mimo.",
      "(IDAKEJE) Alufa: Oluwa Jesu Kristi, gba okan iranse re Late Pa. Wesley Olajide Ojo Aiyegboka kuro ninu ide gbogbo, ki o le simi pelu awon ayanfe re ni ile ayeraye, nibiti o njoba pelu Baba ati Emi mimo, Olorun kan aye ainipekun. Ijo: Amin.",
      "Alufa: Oluwa, fun iranse re ni isimi ainipekun. Ijo: Ki o si je ki imole ododo mole si lara. Alufa: Emi ti gbe Oluwa si iwaju mi nigba gbogbo, nitori tio wa ni owo otun mi, aki vio simi ni ipo. Ijo: Nitori naa ninu mi se dun, ti ogo mi si yo, ara mi pelu yio sinmi ni ireti. Alufa: Nitori iwo ki vio fi okan mi sile ni ipo oku, beeni o ki yio je ki emi mimo re kio ri idibaje. Ijo: Iwo yio fi ipa ona re han mi, ni iwaju re ni ekun rere ayo wa ati ni owo otun re ni ayo arerare wa lailai. Alufa: Oluwa, fun ni isinmi ailopin. Ijo: Ki o si je imole ayeraye tan sori re. Amin."
    ]
  },
  {
    num: 2,
    title: "Sentences",
    sub: "Awon Asayan Oro Itunu",
    body: [
      { type: "verse", text: "Jesus said, I am the resurrection and the life, he that believes in me, though he may die yet shall he live and whosoever lives and believes in me shall never die.", ref: "John 11:25–26" },
      { type: "verse", text: "Let not your hearts be troubled, you believe in God, believe also in me. In my Father's house there are many mansions. If it were not so, I would have told you. I go to prepare a place for you.", ref: "John 14:1–2" },
      { type: "verse", text: "For whether we live, we live unto the Lord; and whether we die, we die unto the Lord. Therefore, whether we live or die, we are the Lord's.", ref: "Romans 14:8" },
      { type: "verse", text: "For I know that my redeemer lives, and that He shall stand at the latter day upon the earth: and after my skin is destroyed, this I know, that in my flesh shall I see God, whom I shall see for myself, and my eyes shall behold, and not another.", ref: "Job 19:25–27" },
      { type: "verse", text: "Neither death, nor life, nor angels, nor principalities, nor things present nor things to come, nor powers nor heights, nor depth, nor anything else in creation will be able to separate us from the love of God in Christ Jesus our Lord.", ref: "Romans 8:38–39" },
      { type: "verse", text: "For we brought nothing into this world, and it is certain we can carry nothing out; the Lord gave, and the Lord has taken away; blessed be the name of the Lord.", ref: "1 Timothy 6:7, Job 11:21" }
    ],
    yoruba: [
      "AWON ASAYAN ORO ITUNU",
      "Oluwa wipe, Emi ni ajinde, ati iye, eniti o ba gba mi gbo, bi o tile ku sibe yio ye. Enikeni ti o si mbe laaye, ti o si gba mi gbo, ki yio ku mo lailai. Johanu 11:25–26",
      "E ma se je ki okan yin daru: e gba Olorun gbo, e gba mi gbo pelu. Ninu ile Baba mi apolopo ibugbe ni o wa: iba ma se bee, emi iba ti so fun yin, nitori emi nio pese aye sile fun nyin. Johannu 14:1–2",
      "Nitori bi awa ba wa laaye, awa o wa laaye fun Oluwa; bi aba si ku, awa ku fun Oluwa, nitori bi awa laaye tabi ku, ti Oluwa la wa rise. Romu 14:8",
      "Emi mo pe Oludande mi mbe, ati pe oun o duro l'ori ile lehin ola. Nipa ti ara mi, bi kokoro tile ba ara yi je, sugbon ni eran ara mi ni emi a ri Olorun, eniti emi ori fun ara mi, ti oju mi yo si ri, ki si ise ti elomiran. Joobu 19:25–27",
      "Nitori o da mi loju pe, ki ise iku tabi iye, tabi awon angeli, tabi awon ijoye, tabi awon ohun igba isinsinyi, tabi igba ti mbo, tabi oke, tabi ogbun, tabi eda miran kan, ni yo le ya wa kuro ninu ife Olorun, ti o wa ninu Kristi Jesu Oluwa wa. Romu 8:38–39",
      "Nitori a ko mu ohunkan wa si aye yi, o si da mi loju pe awa ko si le mu ohun koun jade lo, Oluwa fi fun ni, Oluwa si gbaa; ibukun ni fun oruko Oluwa. 1 Timoti 6:7, Jobu 11:21b"
    ]
  },
  {
    num: 3,
    title: "Hymn — Jesus Lives!",
    sub: "Orin — Jesu Ye",
    body: [
      { type: "hymn", verses: [
        "Jesus lives! Thy terrors now can, O death, no more appall us, Jesus lives! By this we know Thou, O grave, cannot enthrall us. Hallelujah!",
        "Jesus lives! Henceforth is death but the gate of life immortal; This shall calm our trembling breath when we pass its gloomy portal. Hallelujah!",
        "Jesus lives! for us He died; then alone to Jesus living, pure in heart may we abide, glory to our Saviour giving. Hallelujah!",
        "Jesus lives! Our hearts know well naught from us His love shall sever, life, nor death, nor powers of hell, tear us from His keeping ever. Hallelujah!",
        "Jesus lives! To Him the throne over all the world is given: We, in spirit with Him one, rest and reign with Him in heaven. Hallelujah! Amen."
      ]}
    ],
    yoruba: [
      "ORIN — JESU YE",
      "Jesu ye titi aye, Eru iku ko ba mi mo; Jesu ye; nitorina Isa oku ko n'ipa mo - Aleluya.",
      "Jesu ye, lat'oni lo, Iku je ona si iye; Eyi y'o je 'tunu wa, Gbat'akoko iku ba de - Aleluya.",
      "Jesu ye; fun wa lo ku, Nje Tire, ni a o ma se; A o f'okan funfun sin, A o f'ogo f'Olugbala - Aleluya.",
      "Jesu ye; eyi daju, Iku at'ipa okunkun Ki yo le ya ni kuro Ninu ife la ti Jesu - Aleluya.",
      "Jesu ye; gbogbo ijoba L'orun, li aye, di Tire; E je ki a ma tele, Ki a le joba pelu Re - Aleluya. Amin."
    ]
  },
  {
    num: 4,
    title: "Psalm 90",
    sub: "Iwe Orin Dafidi 90",
    body: [
      { type: "hymn", verses: [
        "Lord, thou hast been our dwelling place in all generations.",
        "Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, Thou art God.",
        "Thou turnest man to destruction; and sayest, Return, ye children of men.",
        "For a thousand years in thy sight are but as yesterday when it is past, and as a watch in the night.",
        "Thou carriest them away as with a flood; they are as a sleep: in the morning they are like grass which groweth up.",
        "In the morning it flourisheth, and groweth up; in the evening it is cut down, withereth.",
        "For we are consumed by thine anger, and by thy wrath are we troubled.",
        "Thou hast set our iniquities before thee, our secret sins in the light of thy countenance.",
        "For all our days are passed away in thy wrath: we spend our years as a tale that is told.",
        "The days of our years are threescore years and ten; and if by reason of strength they be fourscore years, yet is their strength labour and sorrow; for it is soon cut off, and we fly away.",
        "Who knoweth the power of thine anger? even according to thy fear, so is thy wrath.",
        "So teach us to number our days, that we may apply our hearts unto wisdom.",
        "Return, O LORD, how long? and let it repent thee concerning thy servants.",
        "O satisfy us early with thy mercy; that we may rejoice and be glad all our days.",
        "Make us glad according to the days wherein thou hast afflicted us, and the years wherein we have seen evil.",
        "Let thy work appear unto thy servants, and thy glory unto their children.",
        "And let the beauty of the Lord our God be upon us: and establish thou the work of our hands upon us; yea, the work of our hands establish thou it."
      ]}
    ],
    yoruba: [
      "IWE ORIN DAFIDI 90",
      "Oluwa, iwo li o ti nse ibujoko wa lati irandiran.",
      "Ki a to bi awon oke nla, ati ki iwo ki o to da ile oun aiye, ani lati aiyeraiye, iwo ni Olorun.",
      "Iwo so enia di ibaje; iwo si wipe, E pada wa, enyin omo eniyan.",
      "Nitori pe igbati egberun odun ba koja, li oju re, bi ana li o ri, ati bi igba isokan li o ri.",
      "Iwo ko won lo bi enipe ni sisan omi; nwon dabi orun; ni kutukutu nwon dabi koriko ti o dagba soke.",
      "Ni kutukutu o nwo lara, o si dagba soke, li asale a ke e lule, o si ro.",
      "Nitori awa di egbe sipa ibinu re ara ko ro wa.",
      "Won ti gbeese wa kaiwaju re: evion ese ikoko wa si han kedere ninu imole oju re.",
      "Nitori ojo aiye wa n koja lo ninu ibinu re: awa nbo ojo wa bi ala ti a nro.",
      "Aadorin odun ni iye ojo odun wa, bi o si sepe nipa ti agbara, bi won ba to ogorin odun, agbara won kiki laalaa on ibinuje ni; nitori pe a ki o pe kee kuro, emi wa a si fo lo.",
      "Tani o mo agbara ibinu re? gege bi eru re ti to beeni ibinu re ri.",
      "Nitori naa ko wa lati ma ka iye ojo ori wa, ki awa ki o le fi okan wa si ipa ogbon.",
      "Yipada si wa Oluwa, yio ti pe to ti o maa binu si wa? Saanu awon iranse re.",
      "Fi ife re ti kii ye te wa lorun ni ewuro; ki a o le maa yo, ki inu wa si maa dun ni gbogbo ojo aye wa.",
      "Mu inu wa dun bi iye ojo ti iwo pon wa loju, ati iye odun ti oju wa ti fi ri ibi.",
      "Je ki ise re han si awon iranse re, ki agbara re ti o logo si han si awon omo won.",
      "Je ki ewa Oluwa Olorun wa ki o wa lara wa: ki iwo ki o si fi idi ise owo wa mule lara wa, beeni jeki ise owo wa fi idi mule."
    ]
  },
  {
    num: 5,
    title: "Lessons — 1 Thessalonians 4:13–18",
    sub: "Eko Kika — 1 Tesa. 4:13–18",
    body: [
      { type: "hymn", verses: [
        "But I would not have you to be ignorant, brethren, concerning them which are asleep, that ye sorrow not, even as others which have no hope.",
        "For if we believe that Jesus died and rose again, even so them also which sleep in Jesus will God bring with him.",
        "For this we say unto you by the word of the Lord, that we which are alive and remain unto the coming of the Lord shall not prevent them which are asleep.",
        "For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first:",
        "Then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air: and so shall we ever be with the Lord.",
        "Wherefore comfort one another with these words."
      ]},
      { type: "liturgy", speaker: "Reader", text: "This is the Word of the Lord." },
      { type: "liturgy", speaker: "Response", text: "Thanks be to God." }
    ],
    yoruba: [
      "EKO KIKA — 1 TESA. 4:13–18",
      "Eyin ara, awa ko fe ki eyin ki o je ope niti awon ti o sun, pe ki e maa banuje gege bi awon yooku ti ko ni ireti.",
      "Nitori bi awa ba gbagbo pe Jesu ku, o si tun jinde, bee gege ni gbogbo awon ti o ti sun ninu Jesu ni Olorun yio jinde pelu re pada wa.",
      "Nitori eyi ni awa n wi fun yin nipa oro Oluwa, pe awa ti o wa laaye, ti a si ku lehin de a ti wa Oluwa, bi o ti wu ki ori, kiyoo saaju awon tio sun lati pade re.",
      "Nitori pe Oluwa funrare yoo sokale lati orun wa, pelu ariwo ase nla ati ohun olori awon angeli ti ipe Olorun; awon oku ninu Kristi yoo si koko jinde.",
      "Nigba naa ni a o gba awa ti o si wa laaye soke pelu won sinu awosanmo lati pade li oju orun, beni awa o si maa wa pelu re titi laelae.",
      "Nitori naa, e ma tu yin ninu, ki e si maa gba are yin niyanju pelu oro wonyi."
    ]
  },
  {
    num: 6,
    title: "Intercessory Prayer",
    sub: "Adura fun Gbogbo Eniyan",
    body: [
      { type: "liturgy", speaker: "Priest", text: "Almighty God who had bound together your elect in one Communion and fellowship in the body of your Son Jesus Christ, grant we pray your whole church in Paradise and on earth, light and your peace." },
      { type: "liturgy", speaker: "People", text: "Amen." },
      { type: "liturgy", speaker: "Priest", text: "Grant that all those who have been saved by the death and resurrection of Christ, may die to sin and rise to a newness of life and through your gate of death to your joyful resurrection." },
      { type: "liturgy", speaker: "People", text: "Amen." },
      { type: "liturgy", speaker: "Priest", text: "Grant to those who mourn, especially the family of our dear Father Late Pa. Wesley Olajide Ojo Aiyegboka, sure confidence in your fatherly care, that casting all their griefs on you, they may know the consolation of your love." },
      { type: "liturgy", speaker: "People", text: "Amen." },
      { type: "liturgy", speaker: "Priest", text: "Grant us grace, to entrust Late Pa. Wesley Olajide Ojo Aiyegboka into your unfailing arms of mercy, and remember according to the favor which you have for your children." },
      { type: "liturgy", speaker: "People", text: "Amen." }
    ],
    yoruba: [
      "ADURA FUN GBOGBO ENIYAN",
      "Alufaa: Olorun alagbara julo, Iwo ti o so awon ayanfe re po ninu idapo ati isokan ara omo Re Jesu Kristi; fifun ni, a n bebe pe ki ijo Re ni paradaise ati aiye yi le ri imole alaafia Re. Ijo: Amin.",
      "Alufaa: Fifun ni ki awon ti a ti gbala nipase iku ati ajinde Kristi lati le di oku si ese lati jinde si igbesi aiye titun, ati nipase ore ofe re ki won le re iku koja si ayo ajinde re. Ijo: Amin.",
      "Alufaa: Fun awon to nkaanu, pataki julo, idile Baba wa Late Pa. Wesley Olajide Ojo Aiyegboka idanilojure, itoju re, to bee ti won yio fi ko gbogbo eru won le O, ati pe ki won le mo itoye itunu ife re. Ijo: Amin.",
      "Alufaa: Fifun ni oore ofe Re lati jowo owo Baba wa Pa. Wesley Olajide Ojo Aiyegboka idaniloju ailopin ife re, gba won ati owo aanu re lati ko ranti won gege bii oju rere won to ni si awon omo re. Ijo: Amin."
    ]
  },
  {
    num: 7,
    title: "Hymn — Jerusalem on High",
    sub: "Orin — Jerusalem T’orun",
    body: [
      { type: "hymn", verses: [
        "Jerusalem on high, my song and city is, my home whene'er I die, the center of my bliss. O happy place! When shall I be, my God, with Thee, to see Thy face!",
        "Thy walls are made of pearls, my heavenly city bright. The gates are dazzling white, thy streets are paved with gold. O happy place! etc.",
        "The sun does not light there, neither is there the moon, all these are not needed, for Jesus is the light. O happy place! Etc.",
        "There dwells my Lord, my King, judged here until to live; there angels to Him sing, and lowly homage give.",
        "The patriarchs of old there from their travels cease; the prophets there behold their long'd-for Prince of peace. O happy place! etc.",
        "The Lamb's apostles there I might with joy behold; the harpers I might hear harping on harps of gold. O happy place etc. Amen."
      ]}
    ],
    yoruba: [
      "ORIN — JERUSALEM T'ORUN",
      "Jerusalem t'orun, L'orin mi, ilu mi! Ile mi bi mba ku; Ekun ibukun mi; Ibi ayo! Nigbawo ni Un o r'oju Re Olorun mi?",
      "Nibe l'Oba mi wa, T'ada lebi laye; Angeli nkorin fun, Won si nteriba fun.",
      "Patriark igbani, Pari irin ajo won nibe Awon woli, won wo o, Omo Alade Alaafia.",
      "Nibe ni imole ri Awon Aposteli; At'awon akorin Ti nlu harpu wura.",
      "Ni agbala wonni, Ni awon Martir wa; Won wo aso ala; Ogo bo ogbe won.",
      "T'emi yi wasu mi, Ti mo ngb'ago Kedar; Ko si 'ru yi loke, Nibe ni mo fe lo. Amin."
    ]
  },
  {
    num: 8,
    title: "Sermon",
    sub: "Iwasu",
    body: [],
    yoruba: []
  },
  {
    num: 9,
    title: "Prayers",
    sub: "Adura",
    body: [
      { type: "liturgy", speaker: "Priest", text: "Lord, have mercy upon us." },
      { type: "liturgy", speaker: "People", text: "Christ, have mercy upon us." },
      { type: "liturgy", speaker: "Priest", text: "Lord, have mercy upon us." },
      { type: "p", text: "The Lord's Prayer: Our Father, which art in heaven… deliver us from evil. Amen." },
      { type: "liturgy", speaker: "Priest", text: "O Lord, enter not into judgement with thy servant, Late Pa. Wesley Olajide Ojo Aiyegboka, O Lord." },
      { type: "liturgy", speaker: "People", text: "For in thy sight shall no man living be justified." },
      { type: "liturgy", speaker: "Priest", text: "Grant unto thy servant Late Pa. Wesley Olajide Ojo Aiyegboka an eternal rest." },
      { type: "liturgy", speaker: "People", text: "And let thy light perpetual shine upon her." },
      { type: "liturgy", speaker: "Priest", text: "We believe verily to see the goodness of the Lord." },
      { type: "liturgy", speaker: "People", text: "In the land of the living." },
      { type: "liturgy", speaker: "Priest", text: "O hear our prayer." },
      { type: "liturgy", speaker: "People", text: "And let our cry come to thee." },
      { type: "p", text: "Let us pray:" },
      { type: "p", text: "O God the King of Saints, we praise and magnify thy Holy name, for all thy servants who have finished their course in the faith, especially thy servant Late Pa. Wesley Olajide Ojo Aiyegboka, we are encouraged by their examples, strengthened by their fellowship and aided by their prayers so that we may attain everlasting life, through the merits of thy Son Jesus Christ our Lord. Amen." },
      { type: "p", text: "Almighty God, with whom do live the spirit of them that departed hence in the Lord, and with whom the souls of the faithful, after they had been delivered from the burden of the flesh, are in joy and felicity, we give thee hearty thanks for it hath pleased thee to deliver Late Pa. Wesley Olajide Ojo Aiyegboka from the miseries of this sinful world, beseeching thee that it may please thee of thy gracious goodness, shortly to accomplish the number of thine elect, and to hasten thy kingdom, that we with all those who hath departed in the true faith of thy Holy name, may have our perfect consummation and bliss, both in body and soul, in thy eternal everlasting glory, through Jesus Christ our Lord." }
    ],
    yoruba: [
      "ADURA",
      "Alufa: Oluwa saanu fun wa. Ijo: Kristi saanu fun wa. Alufa: Oluwa, saanu fun wa. ADURA OLUWA: Baba wa ti mbe ni orun i... sugbon gba wa lowo bilisi. Amin.",
      "Alufa: Oluwa, ma ba omo odo re Late Pa. Wesley Olajide Ojo Aiyegboka se ejo. Ijo: Nitori ko si eni tio wa laaye ti a o da lare ni waju re.",
      "Alufa: Oluwa fun iranse re Late Pa. Wesley Olajide Ojo Aiyegboka ni isinmi ainipekun. Ijo: Ki o si je ki imole re ailopin mole si lara.",
      "Alufa: Awa gbagbo lati ri ire Oluwa. Ijo: Ni ile alaaye. Alufa: Oluwa gbo adura wa. Ijo: Ki o si je ki igbe wa, ki o wa sodo re. Eje ki a gbadura.",
      "Olorun oba awon eni mimo, awa yin O, awa si gbe oruko mimo re ga, fun gbogbo awon iranse re ti won ti pari ise won laiye ni iberu re, pataki awon baba wa Late Pa. Wesley Olajide Ojo Aiyegboka, awa si nbebe lodo re nipa apere iwa mimo ati eko won, ki awa na le je alabapin ati ajogun iye ainipekun, nitori itoye Jesu Kristi omo Re, Oluwa wa. Amin.",
      "Baba Alagbara, Olorun emi gbogbo eda fi mbe loju agbaiye, eniti ko yipo pada, awa fi ibukun fun oruko mimo re, fun gbogbo awon ti oti pari ise won laiye nigbagbo ati iberu re, ti won si ti lihin sinu isinmi, awa ranti awon omo odo re, Late Pa. Wesley Olajide Ojo Aiyegboka awa fi ope furo atigbaiye iwa mimo ati ijusin, awa nbebe lodo re ninu ite ola at'agbara re ki o fi fun ni gedebi awa, ohun rere gbogbo ti iwo ti pese sile nipase Jesu Kristi, Oluwa wa. Amin."
    ]
  },
  {
    num: 10,
    title: "Thanksgiving",
    sub: "Idupe",
    body: [],
    yoruba: []
  },
  {
    num: 11,
    title: "Notices",
    sub: "Ifilo",
    body: [],
    yoruba: []
  },
  {
    num: 12,
    title: "Vote of Thanks",
    sub: "Idupe lati owo ebi",
    body: [],
    yoruba: []
  },
  {
    num: 13,
    title: "Recessional Hymn — Hymn 261",
    sub: "Orin Akojade — Orin 261",
    body: [
      { type: "hymn", verses: [
        "We speak of the realms of the Blest, of that country so bright and so fair, and oft are its glories confessed; but what must it be to be there?",
        "We speak of its pathways of gold, of its walls decked with jewels most rare, its wonders and pleasures untold; but what must it be to be there?",
        "We speak of its freedom from sin, from sorrow, temptation, and care, from trials without and within; but what must it be to be there?",
        "We speak of its anthems of praise, with which we can never compare, the sweetest on earth we can raise; but what must it be to be there?",
        "We speak of its service of love, of the robes which the glorified wear, the Church of the First-born above; but what must it be to be there?",
        "Do Thou, Lord, midst pleasure or woe, still for Heaven our spirits prepare, and shortly we also shall know and see what it is to be there. Amen."
      ]}
    ],
    yoruba: [
      "ORIN AKOJADE — Orin 261",
      "A nsoro ile'bukun ni; Ile didan at'ile ewa; Gbagbogbo l'a nso t'ogo re Y'o ti dun to lati de 'be!",
      "A nsoro ita wura Re; Oso odi re ti ko l'egbe; Faji re ko se f'enu so; Y'o ti dun to lati de 'be!",
      "A nso p'ese ko si nibe Ko s'aniyan at'ibanuje, Pelu danwo l'ode, ninu; Y'o ti dun to lati de 'be!",
      "A nsoro orin iyin re. Ti a kole f'orin aye we, B'o ti wu k'orin wa dun to Y'o ti dun to lati de 'be!",
      "A nsoro isin ife re Ti agbada t'awon mimo nwo, Ijo akobi ti oke; Y'o ti dun to lati de 'be!",
      "Jo Oluwa t'ibi tire Sa se emi wa ye fun orun: Laipe awa na vio mo B'o tieun to lati de 'be. Amin."
    ]
  },
  {
    num: 14,
    title: "Admonition",
    sub: "Awon oro Iyanju",
    body: [],
    yoruba: []
  },
  {
    num: 15,
    title: "Hymns",
    sub: "Orin: Maa Sun Olufe",
    body: [
      { type: "hymn-title", text: "Sleep on, Beloved" },
      { type: "hymn", verses: [
        "Sleep on, beloved, sleep and take thy rest; lay down thy head upon thy Saviour's breast: we love thee well; but Jesus loves thee best. Good-night! Good-night! Good-night!",
        "Calm is thy slumber as an infant's sleep; but thou shalt wake no more to toil and weep: thine is a perfect rest, secure and deep. Good-night! Good-night! Good-night!",
        "Until the shadows from this earth are cast, until He gathers in His sheaves at last, until the twilight gloom is over-past. Good-night! Good-night! Good-night!",
        "Until the Lord's new glory floods the skies, until the loved in Jesus shall arise, and He shall come, but not in lowly guise. Good-night! Good-night! Good-night!",
        "Until made beautiful by Love Divine, thou in the likeness of thy Lord shalt shine, and He shall bring that golden crown of thine. Good-night! Good-night! Good-night!",
        "Only \"good-night,\" beloved-not \"farewell!\" A little while, and all His saints shall dwell in hallowed union, indivisible. Good-night! Good-night! Good-night!",
        "Until we meet again before His throne, clothed in the spotless robe He gives His own, until we know even as we're known. Good-night! Good-night! Good-night! Amen."
      ]},
      { type: "hymn-title", text: "In Christ Alone" },
      { type: "p", text: "Words and music by Keith Getty and Stuart Townend (2001). This contemporary hymn is still under copyright, so its words are not reproduced here. The full text is in the printed programme." }
    ],
    yoruba: [
      "ORIN — MAA SUN OLUFE",
      "Olufe, ma sun; ko si ina simi Gb'ori re le aya olugbala A fe o sugbon Jesu fe o ju, Sun re, sun 're, sun 're.",
      "Orun itura bi omo titun Ise on ekun re ti pari na Simi l'alafia titi aiye Sun're, sun're, sunre.",
      "Simi titi aiye ki yio si mo Ti ao ko alikamo s'aba Ti ao su epo on iyangbo, Sun 're, sun 're, sun're.",
      "Titi ogo ajinde yio ti tan Tit' awon to ku n'nu Jesu yio nde; On yio si wa pelu olanla Re Sun 're, sun 're, sun re.",
      "A o fife Jesu se o logo Won yio si ji lawaran Olorun On yio si mu ade ogo re wa Sun 're, sunre, sun 're.",
      "Sure, Olufe, ki se titi lai, Lehin ga die awon eni mimo Yio ma gbe po in irepo mimo Sun 're, sunre, sun 're.",
      "Titi ao fi pade ni ite Re Ao si wo wa l'agbada funfun; T'a o si ri gegeb'a ti mowa Sun 're, sunre, sun 're."
    ]
  },
  {
    num: 16,
    title: "Committal and Prayer",
    sub: "Isinku ati Adura",
    body: [
      { type: "p", text: "When the coffin is lowered to the grave and the earth shall be cast upon it by someone standing by, the Minister shall say:" },
      { type: "p", text: "For as much as it hath pleased Almighty God in His great mercy to take to Himself the soul of Late Pa. Wesley Olajide Ojo Aiyegboka here departed, we therefore commit her body to the ground; earth for earth, ashes for ashes, dust for dust, in sure and certain hope of resurrection to eternal life through our Lord Jesus Christ, who shall change the body, that it may be like unto His glorious body, according to the working whereby He is able to subdue all things to Himself. Amen." },
      { type: "p", text: "(The minister shall say) I heard a voice from heaven saying unto me, write: henceforth, blessed are the dead who died in the Lord; even so says the Spirit, for they rest from their labours." },
      { type: "liturgy", speaker: "Minister", text: "Lord, have mercy upon us." },
      { type: "liturgy", speaker: "People", text: "Christ, have mercy upon us." },
      { type: "liturgy", speaker: "Minister", text: "Lord, have mercy upon us." },
      { type: "p", text: "The Lord's Prayer: Our Father, which art in heaven… but deliver us from all evil. Amen." },
      { type: "p", text: "Let us pray. Almighty God, with whom do live the spirit of them that departed hence in the Lord, and with whom the souls of the faithful, after they had been delivered from the burden of the flesh, are in joy and felicity: we give thee hearty thanks for it hath pleased thee to deliver this our Father Late Pa. Wesley Olajide Ojo Aiyegboka out of the miseries of this sinful world; beseeching thee that it may please thee, of thy gracious goodness, shortly to accomplish the number of thine elect, and to hasten thy kingdom; that we, with all those who hath departed in the true faith of thy Holy name, may have our perfect consummation and bliss, both in body and soul, in thy eternal everlasting glory, through Jesus Christ our Lord. Amen." },
      { type: "p", text: "O merciful God, the Father of our Lord Jesus, who is the resurrection and the life, in whom whosoever believeth shall live, though he dies, and whosoever liveth and believeth shall not die eternally; who hath taught us through His Holy Apostle Paul not to be sorrowful as men without hope for them that sleep in Him: we meekly beseech thee, O Father, to raise us from the death of sin unto the life of righteousness, that when we shall depart this life we may rest in Him, as we hope our Father Late Pa. Wesley Olajide Ojo Aiyegboka does rest; and that at the general resurrection in the last day we may be found acceptable in thy sight, and receive that blessing which thy well-beloved Son shall then pronounce to all that love and fear thee, saying: \"Come, ye blessed children of my Father, receive the kingdom prepared for you from the beginning of the world.\" Grant her this, we beseech thee, O merciful Father, through Jesus Christ our Mediator and Redeemer. Amen." }
    ],
    yoruba: [
      "ISINKU ATI ADURA",
      "Nigba ti a bu erupe si lori, Alufa yio wipe: Nje bi o ti wu Olorun Olodumare ninu aanu Re nla lati gba okan Late Pa. Wesley Olajide Ojo Aiyegboka ti o fi ihin sile lo sodo ara re, nitorina awa fi oku re fun ile, erupe fun erupe, eeru fun eeru, ekuru fun ekuru, ni ireti ajinde si iye ti ko nipekun nipase Jesu Kristi. Eniti yoo pa a da, ki o le ri bi ara oun tikara re ti ogo, gegebi ise agbara nipa eyi ti oun le fi t'eri ohun gbogbo ba fun ara re. Amin.",
      "(Nigbana ni Alufa yio wipe) Mo gbo ohun kan lati orun wa, ti mn fun kowe re lati isisiyi lo, ibukun ni fun awon oku ti o ku ninu Oluwa; beni emi nwi, nitori won simi kuro ninu laala won.",
      "Alufa: Oluwa saanu fun wa. Ijo: Kristi saanu fun wa. Alufa: Oluwa saanu fun wa. Ijo: Baba wa ti mbe ni orun... sugbon gbawa lowo bilisi. Amin.",
      "Alufa: E je ka gbadura. Olorun Olodumare, eniti emi awon ti o fi ihin sile lo ninu Oluwa mbe lodo re, ati lodo eniti okan awon onigbagbo mbe ninu ayo oun irora, lehin igbati a yo won kuro ninu eru ara won, tokantokan awa fi dupe lowo re, nitori o wu o lati yo Baba wa Late Pa. Wesley Olajide Ojo Aiyegboka kuro ninu osi aye ese yi, awa mbebe lodo re, ki o le wu O, ninu ore re nla ti tete pari iye awon ayanfe Re, ati lati mu ijoba re wa, ki awa pelu gbogbo awon ti o fi ihin sile lo ni igbagbo otito oruko Re mimo, ki a le ni ekun ati irora wa anidopin, li ara ati okan titi lai ninu ogo Re ti ko nipekun, nipase Jesu Kristi Oluwa wa. Amin.",
      "Olorun alaanu, Baba Oluwa wa Jesu Kiristi eniti ise ajinde ati iye; eniti enikeni ti o ba gba a gbo yoo wa laaye, ti o si gba gbo ki yio ku mo lailai; eniti o ti owo Paolu Apostoli Re mimo ko wa pe ki a ma banuje, bi awon ti ka ni ireti fun awon ti o sun ninu Re. Awa fi irele bebe lodo Re Baba, ki o ji wa dide kuro ninu iku ese si iye ododo; nigbati awa o ba fi aye sile lo ki awa ki o le simi ninu re bi awa ti ni ireti pe Baba wa Late Pa. Wesley Olajide Ojo Aiyegboka nsimi, ati ni ajinde gbogbo eniyan ni ojo ikehin, ki a le ba wa ni eni itewogba ni oju Re; ki a si le ri ibukun naa gba, ti Omo Re Olufe jojo yoo so niga naa fun gbogbo awon tio feran re ti won si beru re wipe: 'E wa enyin alabukun fun omo Baba mi, e gba ijoba ti a ti pese sile fun nyin lati ipilese aye.' Fun ni eyi, awa mbebe lodo Re Baba alaanu, nipase Kristi onilaja ati Oludande wa. Amin."
    ]
  },
  {
    num: 17,
    title: "Benediction and Grace",
    sub: "Adura Ikehin ati Ore-ofe",
    body: [
      { type: "p", text: "Go forth upon thy journey from this world, Late Pa. Wesley Olajide Ojo Aiyegboka, in the name of God the Father Almighty who created you." },
      { type: "liturgy", speaker: "Priest", text: "In the name of Jesus Christ who suffered for thee." },
      { type: "liturgy", speaker: "People", text: "Amen." },
      { type: "liturgy", speaker: "Priest", text: "In the name of the Holy Spirit who strengtheneth thee." },
      { type: "liturgy", speaker: "People", text: "Amen." },
      { type: "liturgy", speaker: "Priest", text: "In communion with the blessed saints, and aided by Angels and Archangels and all the armies of the heavenly hosts." },
      { type: "liturgy", speaker: "People", text: "Amen. The peace of God shall be yours from now. Your abode shall be of great joy in heaven." },
      { type: "p", text: "May God Almighty, who from the wilderness brought out our Lord Jesus Christ, resurrect you from death with the saints at the end time." },
      { type: "liturgy", speaker: "People", text: "Amen." },
      { type: "p", text: "The Grace: The grace of our Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit, be with us now and evermore." },
      { type: "liturgy", speaker: "People", text: "Amen." }
    ],
    yoruba: [
      "ADURA IKEHIN ATI ORE-OFE",
      "Alufa: Ma lo, iwo omo lehin Kristi Late Pa. Wesley Olajide Ojo Aiyegboka, ninu irin ajo re kuro ninu aye ese yii, ni oruko Olorun Baba Olodumare eniti o da o. Ijo: Amin.",
      "Alufa: Ni oruko Jesu Kristi, eniti o jiya nitori re. Ijo: Amin.",
      "Alufa: Ni oruko Emi Mimo eniti o fun o ni agbara. Ijo: Amin.",
      "Alufa: Ni idapo pelu awon eniyan mimo, awon Angeli ati awon olori Angeli ati pelu gbogbo awon egbe. Ijo: Amin.",
      "Alufa: Ki alaafia Olorun ma je tire lati ori lo. Ki ibugbe re si je ibi ayo nla ni orun. Ijo: Amin.",
      "Ore-ofe Oluwa wa Jesu Kristi, ife Olorun, ati idapo Emi Mimo, ki o maa be pelu wa nisisiyi ati lailai. Ijo: Amin."
    ]
  }
];
