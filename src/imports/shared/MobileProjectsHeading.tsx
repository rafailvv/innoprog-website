export function MobileProjectsHeading({ count, label = "примерных тем" }: { count: number; label?: string }) {
  return (
    <div className="site-mobile-projects-heading">
      <h2>{count} {label}</h2>
      <p>по программе обучения</p>
    </div>
  );
}
