import Hero from "@/components/Hero";

const TITLE_CLASS = "my-2 text-2xl font-bold text-gray-800";

export default function AboutPage() {
  return (
    <>
      <Hero />
      <section className="p-8 m-8 text-center bg-gray-100 shadow-lg">
        <h2 className={TITLE_CLASS}>Who Am I?</h2>
        <p>
          개발을 사랑하는 개발자입니다. <br />
          사람과 디자인을 담는 웹앱을 만들고 있습니다.
        </p>
        <h2 className={TITLE_CLASS}>Career</h2>
        <p>
          구글러(-Now) <br />
          메이스북 (-2022) <br />
          삼준전자 (-2021) <br />
        </p>
        <h2 className={TITLE_CLASS}>Skills</h2>
        <p>
          React, Node <br />
          Git, Clean Code <br />
          VS Code <br />
        </p>
      </section>
    </>
  );
}
