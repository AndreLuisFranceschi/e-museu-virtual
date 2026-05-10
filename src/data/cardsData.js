const dadosCards = [
  {
    id: 1,
    titulo: "Cartão Perfurado IBM",
    categoria: "Armazenamento",
    imagem:
      "https://gdhpress.com.br/wp-content/uploads/2020/08/cartoes-perfurados.jpg",
    fabricante: "IBM",
    ano: 1950,
    descricao:
      "Cartões perfurados eram usados para entrada, processamento e armazenamento de dados em computadores antigos.",
    curiosidade:
      "O conceito foi criado por Herman Hollerith para o censo dos EUA em 1890 e influenciou a fundação da IBM.",
  },
  {
    id: 2,
    titulo: "IBM Diskette 2 Floppy Disk",
    categoria: "Armazenamento",
    imagem: "https://tse1.mm.bing.net/th/id/OIP.Xvk5NQc1GyakOnmkfMeKygHaEc",
    fabricante: "IBM",
    ano: 1971,
    descricao:
      "Disquete de 8 polegadas usado para armazenar dados em computadores pessoais e empresariais.",
    curiosidade:
      "O termo 'floppy' vem da flexibilidade do disco original, que era envolto em uma capa plástica mole.",
  },
  {
    id: 3,
    titulo: "Toca Discos Philips",
    categoria: "Áudio",
    imagem: "https://d2e93ry8xjqpji.cloudfront.net/imagens/img_g/135/74340.jpg",
    fabricante: "Philips",
    ano: 1980,
    descricao:
      "Equipamento usado para reproduzir discos de vinil com alta fidelidade sonora.",
    curiosidade:
      "O vinil voltou à moda nos anos 2010, sendo valorizado por audiófilos e colecionadores.",
  },
  {
    id: 4,
    titulo: "Philips Konzertmeister 852",
    categoria: "Áudio",
    imagem:
      "https://http2.mlstatic.com/D_NQ_NP_856965-MLB75703175430_042024-O.webp",
    fabricante: "Philips",
    ano: 1975,
    descricao: "Rádio e toca-fitas de mesa com design clássico e som estéreo.",
    curiosidade:
      "O nome 'Konzertmeister' remete ao maestro de uma orquestra, destacando sua qualidade sonora.",
  },
  {
    id: 5,
    titulo: "Olivetti Logos 682",
    categoria: "Calculadoras",
    imagem: "https://www.bing.com/th/id/OIP.CkINrpa0TN8-iGg7ci_HNAHaNK",
    fabricante: "Olivetti",
    ano: 1982,
    descricao:
      "Calculadora eletrônica de mesa usada em escritórios para operações financeiras.",
    curiosidade:
      "A Olivetti foi pioneira em design industrial, combinando funcionalidade com estética.",
  },
  {
    id: 6,
    titulo: "Gevaert Gevabox",
    categoria: "Câmeras/Filmadoras",
    imagem: "https://th.bing.com/th/id/OIP.Ziepo5cIvBHfZ_R2wUOqqgHaF4",
    fabricante: "Gevaert",
    ano: 1955,
    descricao:
      "Câmera fotográfica de médio formato usada por amadores e profissionais.",
    curiosidade:
      "A Gevaert se fundiu com a Agfa em 1964, formando a Agfa-Gevaert.",
  },
  {
    id: 7,
    titulo: "Toshiba T4850CT",
    categoria: "Computadores",
    imagem:
      "https://th.bing.com/th/id/R.097e77bfbc55357e015441cfee25840f?rik=%2fliQR6N19lNq0g&pid=ImgRaw&r=0",
    fabricante: "Toshiba",
    ano: 1994,
    descricao: "Notebook compacto com tela colorida e processador Intel 486.",
    curiosidade:
      "Foi um dos primeiros laptops com drive de CD-ROM embutido, algo raro na época.",
  },
  {
    id: 8,
    titulo: "Rima Emilia PC",
    categoria: "Impressoras",
    imagem:
      "https://th.bing.com/th/id/R.c18e6055e8856be11e19639b4fe00f6f?rik=3YSYorjEEzHM4A&riu=http%3a%2f%2fsites.unoeste.br%2fmuseufipp%2fwp-content%2fuploads%2f2016%2f09%2fEmilia-R250-2.jpg&ehk=ICWhnlUGpxZzyu55myv71d27o6BM9cC1Hj69seorD1Q%3d&risl=&pid=ImgRaw&r=0",
    fabricante: "Rima",
    ano: 1990,
    descricao:
      "Impressora matricial usada em ambientes corporativos e educacionais.",
    curiosidade:
      "O modelo Emilia era conhecido pela robustez e durabilidade em ambientes de alto uso.",
  },
  {
    id: 9,
    titulo: "Olivetti Lexikon 80",
    categoria: "Máquinas de Escrever",
    imagem:
      "https://i.etsystatic.com/8429430/r/il/76190a/1527287908/il_fullxfull.1527287908_75jy.jpg",
    fabricante: "Olivetti",
    ano: 1950,
    descricao:
      "Máquina de escrever mecânica usada por escritores, jornalistas e secretárias.",
    curiosidade:
      "Foi usada por Pier Paolo Pasolini e outros intelectuais italianos da época.",
  },
  {
    id: 10,
    titulo: "Microsoft Serial PS/2 Compatible Mouse",
    categoria: "Periféricos",
    imagem: "https://i.ebayimg.com/images/g/EAAAAOSw-kZl1un8/s-l1600.jpg",
    fabricante: "Microsoft",
    ano: 1993,
    descricao: "Mouse com conexão serial e compatibilidade com porta PS/2",
    curiosidade:
      "Foi um dos primeiros mouses da Microsoft, lançado junto com o Windows 3.1",
  },
  {
    id: 11,
    titulo: "Walkman AIWA TA133",
    categoria: "Portáteis",
    imagem:
      "https://cloud10.todocoleccion.online/radios-transistores/tc/2017/04/03/01/82243568_53840154.jpg",
    fabricante: "AIWA",
    ano: 1995,
    descricao:
      "Reprodutor portátil de fitas cassete, popular entre jovens nos anos 90.",
    curiosidade:
      "Apesar da Sony ser pioneira com o Walkman, a AIWA conquistou o mercado com modelos mais acessíveis.",
  },
  {
    id: 12,
    titulo: "Intel DX4",
    categoria: "Processadores",
    imagem: "https://www.bing.com/th/id/OIP.Sku9G5sBPnsjWhuNXTdrSQHaEG",
    fabricante: "Intel",
    ano: 1994,
    descricao:
      "Processador da família 486 com clock triplicado, voltado para PCs de alto desempenho.",
    curiosidade:
      "Apesar do nome DX4, ele não era um 486 com quatro vezes o clock, mas sim três vezes.",
  },
  {
    id: 13,
    titulo: "Lightware VP800",
    categoria: "Projetores",
    imagem: "https://www.bing.com/th/id/OIP.ZcN1YlzK5n7VeC7Q0iGmgQHaHO",
    fabricante: "Lightware",
    ano: 2000,
    descricao:
      "Projetor multimídia usado em salas de aula e apresentações corporativas.",
    curiosidade:
      "Suportava entrada VGA e vídeo composto, sendo compatível com PCs e videocassetes.",
  },
  {
    id: 14,
    titulo: "Encore ENP832-TX-PC",
    categoria: "Redes",
    imagem: "https://www.bing.com/th?id=OIP.AXP0BdNv6cntuh6f9ckwcAHaFj",
    fabricante: "Encore",
    ano: 2002,
    descricao: "Placa de rede Ethernet 10/100 Mbps para computadores desktop.",
    curiosidade:
      "Era uma das placas mais vendidas no Brasil no início dos anos 2000 por seu custo-benefício.",
  },
  {
    id: 15,
    titulo: "Windows 98 SE Upgrade",
    categoria: "Softwares",
    imagem: "https://archive.org/services/img/windows-98-se-upgrade",
    fabricante: "Microsoft",
    ano: 1999,
    descricao:
      "Atualização do sistema operacional Windows 98 com melhorias de estabilidade e suporte USB.",
    curiosidade:
      "Foi o sistema mais usado no mundo até o lançamento do Windows XP em 2001.",
  },
  {
    id: 16,
    titulo: "Ericsson DL6",
    categoria: "Telefones",
    imagem:
      "https://photos.enjoei.com.br/telefone-antigo-ericsson-do-brasil-1985/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xNjUzODE5Mi83N2I2MWQ5MjU0NmRmMjNiNTJiYWM0ODhmMDVhMzRkMS5qcGc",
    fabricante: "Ericsson",
    ano: 1985,
    descricao: "Telefone fixo analógico com design robusto e som claro.",
    curiosidade:
      "Muito comum em residências e escritórios brasileiros nas décadas de 80 e 90.",
  },
  {
    id: 41,
    titulo: "Calculadora Casio fx-82MS",
    categoria: "Calculadoras",
    imagem:
      "https://media.karousell.com/media/photos/products/2022/8/16/casio_digital_diary_sf4300_bk__1660646876_7d08f6d1_progressive.jpg",
    fabricante: "Casio",
    ano: 1999,
    descricao:
      "Calculadora científica com 240 funções, visor de duas linhas e memória independente.",
    curiosidade:
      "Popular entre estudantes do ensino médio e universitário por sua precisão e custo acessível.",
  },
  {
    id: 45,
    titulo: "Câmera Yashica Electro 35",
    categoria: "Câmera/Filmadora",
    fabricante: "Yashica",
    ano: 1966,
    imagem: "https://yashicatlr.com/Yashica35/ylynx2.8.jpg",
    descricao:
      "Câmera rangefinder com lente fixa 45mm f/1.7 e controle eletrônico de exposição.",
    curiosidade:
      "Ficou famosa por sua precisão e qualidade ótica, sendo usada por fotógrafos urbanos e viajantes.",
  },
  {
    id: 46,
    titulo: "Filmadora Panasonic NV-RX1",
    categoria: "Câmera/Filmadora",
    fabricante: "Panasonic",
    ano: 1995,
    imagem:
      "https://static-data2.manualslib.com/product-images/118/11708/1170778/raw.jpg",
    descricao:
      "Filmadora VHS-C com zoom óptico 12x, estabilizador de imagem e microfone embutido.",
    curiosidade:
      "Era popular em eventos familiares e escolares, com gravação direta em fitas compactas.",
  },
  {
    id: 47,
    titulo: "Filmadora Sony Handycam DCR-HC21",
    categoria: "Câmera/Filmadora",
    fabricante: "Sony",
    ano: 2005,
    imagem:
      "https://i.pinimg.com/originals/c2/f2/a3/c2f2a31f7bb96452015a875f2f0b4807.jpg",
    descricao:
      "Filmadora digital MiniDV com tela LCD giratória, zoom 20x e entrada FireWire.",
    curiosidade:
      "Muito usada por estudantes e criadores independentes no início da era digital.",
  },
  {
    id: 49,
    titulo: 'Disquete 8" IBM',
    categoria: "Computador/Periférico",
    fabricante: "IBM",
    ano: 1971,
    imagem:
      "https://i.pinimg.com/originals/6e/11/1c/6e111ca3ade8bfeb66223d4a62f40a40.jpg",
    descricao:
      "Disco magnético flexível de 8 polegadas com capacidade de 80 KB.",
    curiosidade:
      "Foi criado para substituir os cartões perfurados e revolucionou o armazenamento de dados.",
  },
  {
    id: 50,
    titulo: 'Disquete 5¼"',
    categoria: "Armazenamento",
    fabricante: "IBM, Shugart, Verbatim",
    ano: 1976,
    imagem:
      "https://th.bing.com/th/id/R.1fee6e53efaa2f5b21b2ae3b8c66affa?rik=da2o5XWo0CFVhg&riu=http%3a%2f%2f2.bp.blogspot.com%2f-Q2qoWn3gZW0%2fTx2w10UDxjI%2fAAAAAAAAJMc%2fxVF7HoV-XW0%2fw1200-h630-p-k-no-nu%2fdisquete-5-1-4.jpg&ehk=TVjeE%2bXVDWgJnzqp%2bJnnq7Ladrdcl9G8fgW2PtR%2f09k%3d&risl=&pid=ImgRaw&r=0",
    descricao:
      "Disquete flexível com capacidade entre 160 KB e 1.2 MB, usado em PCs.",
    curiosidade:
      "Popular nos anos 80, era comum armazenar jogos, textos e programas em vários disquetes.",
  },
  {
    id: 51,
    titulo: 'Disquete 3½" Sony',
    categoria: "Armazenamento",
    fabricante: "Sony",
    ano: 1981,
    imagem:
      "https://www.aresluna.org/attached/pics/computerhistory/articles/macintoshbytepreview/photo4.big.jpg",
    descricao:
      "Disquete rígido de 3,5 polegadas com capacidade de até 1.44 MB.",
    curiosidade:
      "Foi o padrão de armazenamento portátil por mais de uma década, usado em escolas e escritórios.",
  },
  {
    id: 52,
    titulo: "HD Elebra WD930ST",
    categoria: "Armazenamento",
    fabricante: "Elebra",
    ano: 1989,
    imagem:
      "https://tse3.mm.bing.net/th/id/OIP.pDuzkbATM-P-wT6BNbLHrAHaJm?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    descricao:
      'Disco rígido de 5¼" com interface ST506 ou IDE, capacidade entre 20 MB e 40 MB.',
    curiosidade:
      "Fabricado no Brasil, era usado em computadores nacionais como o Elebra-Micro e o Cobra.",
  },
];

export default dadosCards;
