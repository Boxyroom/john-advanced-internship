'use client';

import Image from 'next/image';
import {
  AiFillFileText,
  AiFillBulb,
  AiFillAudio,
} from 'react-icons/ai';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { BiCrown } from 'react-icons/bi';
import { RiLeafLine } from 'react-icons/ri';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navWrapper}>
          <figure className={styles.navImgMask}>
            <Image
              className={styles.navImg}
              src="/assets/logo.png"
              alt="logo"
              width={200}
              height={80}
              sizes="(max-width: 768px) 150px, 200px"
              priority
            />
          </figure>
          <ul className={styles.navListWrapper}>
            <li className={`${styles.navList} ${styles.navListLogin}`}>
              Login
            </li>
            <li className={`${styles.navList} ${styles.navListMobile}`}>About</li>
            <li className={`${styles.navList} ${styles.navListMobile}`}>Contact</li>
            <li className={`${styles.navList} ${styles.navListMobile}`}>Help</li>
          </ul>
        </div>
      </nav>

      {/* Landing Section */}
      <section id="landing">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.landingWrapper}>
              <div className={styles.landingContent}>
                <div className={styles.landingContentTitle}>
                  Gain more knowledge <br className={styles.removeTablet} />
                  in less time
                </div>
                <div className={styles.landingContentSubtitle}>
                  Great summaries for busy people,
                  <br className={styles.removeTablet} />
                  individuals who barely have time to read,
                  <br className={styles.removeTablet} />
                  and even people who don&apos;t like to read.
                </div>
                <button className={`${styles.btn} ${styles.homeCtaBtn}`}>
                  Login
                </button>
              </div>
              <figure className={styles.landingImageMask}>
                <Image
                  src="/assets/landing.png"
                  alt="landing"
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 0px, 400px"
                  priority
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.sectionTitle}>
              Understand books in few minutes
            </div>
            <div className={styles.featuresWrapper}>
              <div className={styles.features}>
                <div className={styles.featuresIcon}>
                  <AiFillFileText />
                </div>
                <div className={styles.featuresTitle}>Read or listen</div>
                <div className={styles.featuresSubTitle}>
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className={styles.features}>
                <div className={styles.featuresIcon}>
                  <AiFillBulb />
                </div>
                <div className={styles.featuresTitle}>Find your next read</div>
                <div className={styles.featuresSubTitle}>
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className={styles.features}>
                <div className={styles.featuresIcon}>
                  <AiFillAudio />
                </div>
                <div className={styles.featuresTitle}>Briefcasts</div>
                <div className={styles.featuresSubTitle}>
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>

            {/* Statistics Wrapper 1 */}
            <div className={styles.statisticsWrapper}>
              <div className={styles.statisticsContentHeader}>
                <div className={styles.statisticsHeading}>
                  Enhance your knowledge
                </div>
                <div className={styles.statisticsHeading}>
                  Achieve greater success
                </div>
                <div className={styles.statisticsHeading}>
                  Improve your health
                </div>
                <div className={styles.statisticsHeading}>
                  Develop better parenting skills
                </div>
                <div className={styles.statisticsHeading}>
                  Increase happiness
                </div>
                <div className={styles.statisticsHeading}>
                  Be the best version of yourself!
                </div>
              </div>
              <div className={styles.statisticsContentDetails}>
                <div className={styles.statisticsData}>
                  <div className={styles.statisticsDataNumber}>93%</div>
                  <div className={styles.statisticsDataTitle}>
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
                  </div>
                </div>
                <div className={styles.statisticsData}>
                  <div className={styles.statisticsDataNumber}>96%</div>
                  <div className={styles.statisticsDataTitle}>
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className={styles.statisticsData}>
                  <div className={styles.statisticsDataNumber}>90%</div>
                  <div className={styles.statisticsDataTitle}>
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Wrapper 2 */}
            <div className={styles.statisticsWrapper}>
              <div
                className={`${styles.statisticsContentDetails} ${styles.statisticsContentDetailsSecond}`}
              >
                <div className={styles.statisticsData}>
                  <div className={styles.statisticsDataNumber}>91%</div>
                  <div className={styles.statisticsDataTitle}>
                    of Summarist members <b>report feeling more productive</b>{' '}
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className={styles.statisticsData}>
                  <div className={styles.statisticsDataNumber}>94%</div>
                  <div className={styles.statisticsDataTitle}>
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className={styles.statisticsData}>
                  <div className={styles.statisticsDataNumber}>88%</div>
                  <div className={styles.statisticsDataTitle}>
                    of Summarist members <b>feel more informed</b> about current
                    events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div
                className={`${styles.statisticsContentHeader} ${styles.statisticsContentHeaderSecond}`}
              >
                <div className={styles.statisticsHeading}>
                  Expand your learning
                </div>
                <div className={styles.statisticsHeading}>
                  Accomplish your goals
                </div>
                <div className={styles.statisticsHeading}>
                  Strengthen your vitality
                </div>
                <div className={styles.statisticsHeading}>
                  Become a better caregiver
                </div>
                <div className={styles.statisticsHeading}>
                  Improve your mood
                </div>
                <div className={styles.statisticsHeading}>
                  Maximize your abilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews">
        <div className={styles.row}>
          <div className={styles.container}>
            <div className={styles.sectionTitle}>What our members say</div>
            <div className={styles.reviewsWrapper}>
              <div className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div>Hanna M.</div>
                  <div className={styles.reviewStars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.reviewBody}>
                  This app has been a <b>game-changer</b> for me! It&apos;s saved me
                  so much time and effort in reading and comprehending books.
                  Highly recommend it to all book lovers.
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div>David B.</div>
                  <div className={styles.reviewStars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.reviewBody}>
                  I love this app! It provides
                  <b>concise and accurate summaries</b> of books in a way that
                  is easy to understand. It&apos;s also very user-friendly and
                  intuitive.
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div>Nathan S.</div>
                  <div className={styles.reviewStars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.reviewBody}>
                  This app is a great way to get the main takeaways from a book
                  without having to read the entire thing.
                  <b>The summaries are well-written and informative.</b>
                  Definitely worth downloading.
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div>Ryan R.</div>
                  <div className={styles.reviewStars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.reviewBody}>
                  If you&apos;re a busy person who
                  <b>loves reading but doesn&apos;t have the time</b> to read every
                  book in full, this app is for you! The summaries are thorough
                  and provide a great overview of the book&apos;s content.
                </div>
              </div>
            </div>
            <div className={styles.reviewsBtnWrapper}>
              <button className={`${styles.btn} ${styles.homeCtaBtn}`}>
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section id="numbers">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.sectionTitle}>
              Start growing with Summarist now
            </div>
            <div className={styles.numbersWrapper}>
              <div className={styles.numbers}>
                <div className={styles.numbersIcon}>
                  <BiCrown />
                </div>
                <div className={styles.numbersTitle}>3 Million</div>
                <div className={styles.numbersSubTitle}>
                  Downloads on all platforms
                </div>
              </div>
              <div className={styles.numbers}>
                <div className={`${styles.numbersIcon} ${styles.numbersStarIcon}`}>
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className={styles.numbersTitle}>4.5 Stars</div>
                <div className={styles.numbersSubTitle}>
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className={styles.numbers}>
                <div className={styles.numbersIcon}>
                  <RiLeafLine />
                </div>
                <div className={styles.numbersTitle}>97%</div>
                <div className={styles.numbersSubTitle}>
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer} id="footer">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.footerTopWrapper}>
              <div className={styles.footerBlock}>
                <div className={styles.footerLinkTitle}>Actions</div>
                <div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Summarist Magazine</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Cancel Subscription</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Help</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Contact us</a>
                  </div>
                </div>
              </div>
              <div className={styles.footerBlock}>
                <div className={styles.footerLinkTitle}>Useful Links</div>
                <div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Pricing</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Summarist Business</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Gift Cards</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Authors & Publishers</a>
                  </div>
                </div>
              </div>
              <div className={styles.footerBlock}>
                <div className={styles.footerLinkTitle}>Company</div>
                <div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>About</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Careers</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Partners</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Code of Conduct</a>
                  </div>
                </div>
              </div>
              <div className={styles.footerBlock}>
                <div className={styles.footerLinkTitle}>Other</div>
                <div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Sitemap</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Legal Notice</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Terms of Service</a>
                  </div>
                  <div className={styles.footerLinkWrapper}>
                    <a className={styles.footerLink}>Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.footerCopyrightWrapper}>
              <div className={styles.footerCopyright}>
                Copyright &copy; 2023 Summarist.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
