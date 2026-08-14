type CourseTariffDiplomaFeaturesProps = {
  tone: "dark" | "light";
};

const DIPLOMA_FEATURES = [
  "Диплом ИТ-школы ИННОПРОГ о прохождении курса",
  "Диплом о профессиональной переподготовке",
] as const;

export function CourseTariffDiplomaFeatures({ tone }: CourseTariffDiplomaFeaturesProps) {
  return (
    <>
      {DIPLOMA_FEATURES.map((feature) => (
        <div
          className={`site-course-tariff-diploma-feature site-course-tariff-diploma-feature--${tone}`}
          key={feature}
        >
          <span aria-hidden="true" className="site-course-tariff-diploma-feature__check">
            ✓
          </span>
          <p>{feature}</p>
        </div>
      ))}
    </>
  );
}
