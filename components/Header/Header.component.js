import { useEffect, useRef, useState } from "react";
import styles from "./header.module.scss";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const TOTAL_FLAKE_ELEMENTS = 400;

function getAngleBetweenTwoPoints(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;

  var theta = Math.atan2(dy, dx);
  theta = (theta * 180) / Math.PI; // rads to degs

  return theta;
}

function getElementPosition(el) {
  const rect = el.getBoundingClientRect();

  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
}

function doElementsCollide(el1, el2) {
  el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
  el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
  el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
  el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

  return !(
    el1.offsetBottom < el2.offsetTop ||
    el1.offsetTop > el2.offsetBottom ||
    el1.offsetRight < el2.offsetLeft ||
    el1.offsetLeft > el2.offsetRight
  );
}

export default function Header() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const elementRefs = useRef([]);
  const circleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePos({ x, y });
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < TOTAL_FLAKE_ELEMENTS; i++) {
      const item = elementRefs.current[i];
      if (doElementsCollide(circleRef.current, item)) {
        const elPos = getElementPosition(item);
        const angle = getAngleBetweenTwoPoints(
          mousePos.x,
          mousePos.y,
          elPos.x,
          elPos.y
        );

        item.setAttribute("style", `transform: rotate(${angle}deg)`);
      } else {
        if (i % 2 == 0) {
          item.setAttribute("style", `transform: rotate(50deg)`);
        } else {
          item.setAttribute("style", `transform: rotate(-165deg)`);
        }
      }
    }
  }, [mousePos]);

  const flakesElements = [];

  for (let i = 0; i < TOTAL_FLAKE_ELEMENTS; i++) {
    flakesElements.push(
      <div
        key={`flake-${i + 1}`}
        ref={(ref) => {
          elementRefs.current[i] = ref;
        }}
        id="flake"
        style={{ transform: "rotate(0deg)" }}
        className={`flake ${styles.flake}`}
      ></div>
    );
  }

  return (
    <section ref={containerRef} className={styles.header}>
      <div
        ref={circleRef}
        style={{
          width: 200,
          height: 200,
          left: -100 + mousePos.x,
          top: -100 + mousePos.y,
        }}
        id="circle"
        className={styles.circle}
      ></div>
      <div className={`${styles.flakes}`}>{flakesElements}</div>
      <div className={styles["header-content"]}>
        <h2>Hi There!</h2>
        <p>
          I am <span>Himanshu Varshney</span>.
          <br />
        </p>
        <p> A Software Engineer.</p>
        <div className={styles.buttons}>
          <a
            href="https://github.com/varshney-himanshu"
            target="_blank"
            rel="noreferrer"
            className="btn btn--white"
          >
            <FaGithub /> Github
          </a>
          <a
            href="https://www.linkedin.com/in/varshney-himanshu/"
            target="_blank"
            rel="noreferrer"
            className="btn btn--white"
          >
            <FaLinkedin /> LinkedIn
          </a>

          <a
            href="https://twitter.com/_partofice"
            target="_blank"
            rel="noreferrer"
            className="btn btn--white"
          >
            <FaTwitter /> Twitter
          </a>
        </div>
      </div>
    </section>
  );
}
