import styles from "./layout.module.css";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className={styles.category}>
        <a href="">여성옷</a>
        <a href="">남성옷</a>
      </nav>
      <section className={styles.product}>{children}</section>
    </>
  );
}
