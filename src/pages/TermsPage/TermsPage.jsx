import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './TermsPage.scss'

function TermsPage() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    )
    .fromTo(introRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    )
    .fromTo(listRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      '-=0.2'
    )
  }, [])

  return (
    <section className="terms" ref={sectionRef}>
      <div className="container">
        <h1 ref={titleRef}>Kushtet dhe Afatet e Përdorimit</h1>
        <p className="intro" ref={introRef}>Lexoni me kujdes përpara se të vazhdoni me marrjen me qira të ATV-së.</p>

        <ol className="terms__list" ref={listRef}>
          <li>
            <h2>Kriteret për Marrjen me Qira</h2>
            <ul>
              <li>Qiramarrësi duhet të jetë mbi 18 vjeç.</li>
              <li>Duhet të ketë letërnjoftim ose pasaportë valide.</li>
              <li>Duhet të paraqesë patentë shoferi të vlefshme (nëse kërkohet nga lloji i ATV-së).</li>
            </ul>
          </li>
          <li>
            <h2>Periudha e Qirasë dhe Pagesa</h2>
            <ul>
              <li>Pagesa e plotë kryhet përpara fillimit të qirasë.</li>
              <li>Çdo vonesë në kthimin e ATV-së mund të sjellë tarifë shtesë sipas çmimores.</li>
              <li>ATV-ja duhet të kthehet me të njëjtin nivel karburanti si në momentin e marrjes.</li>
            </ul>
          </li>
          <li>
            <h2>Përdorimi i Lejuar</h2>
            <ul>
              <li>ATV mund të përdoret vetëm në rrugë dhe terrene të lejuara nga ligji.</li>
              <li>Ndalohet përdorimi i ATV-së për gara, manovra të rrezikshme, ose aktivitete të paligjshme.</li>
              <li>Qiramarrësi duhet të përdorë gjithmonë helmetë dhe pajisje sigurie.</li>
            </ul>
          </li>
          <li>
            <h2>Përgjegjësia e Qiramarrësit</h2>
            <ul>
              <li>Qiramarrësi është përgjegjës për çdo dëmtim të ATV-së gjatë periudhës së qirasë.</li>
              <li>Në rast aksidenti, qiramarrësi duhet të njoftojë menjëherë policinë dhe kompaninë.</li>
              <li>Qiramarrësi mban përgjegjësi për gjobat dhe shkeljet e trafikut të kryera gjatë përdorimit.</li>
            </ul>
          </li>
          <li>
            <h2>Sigurimi</h2>
            <ul>
              <li>ATV mund të jetë i mbuluar nga sigurimi bazik sipas ligjeve në fuqi.</li>
              <li>Çdo dëm që nuk mbulohet nga sigurimi është përgjegjësi e plotë e qiramarrësit.</li>
            </ul>
          </li>
          <li>
            <h2>Kthimi i ATV-së</h2>
            <ul>
              <li>ATV duhet të kthehet në të njëjtën gjendje si në momentin e marrjes.</li>
              <li>Nëse konstatohet dëmtim, humbje aksesorësh ose papastërti e tepruar, aplikohen tarifa shtesë.</li>
            </ul>
          </li>
          <li>
            <h2>Shkelja e Rregullave</h2>
            <p>Nëse qiramarrësi shkel këto kushte, kompania ka të drejtë të ndërpresë menjëherë kontratën dhe të kërkojë kompensim.</p>
          </li>
          <li>
            <h2>Ligji në fuqi</h2>
            <p>Ky shërbim rregullohet nga ligjet e Republikës së Kosovës. Çdo mosmarrëveshje zgjidhet nëpërmjet gjykatave kompetente në Kosovë.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}

export default TermsPage

