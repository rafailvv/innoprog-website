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
            <svg fill="none" viewBox="0 0 26 26">
              <path
                clipRule="evenodd"
                d="M13 26C5.8201 26 0 20.1799 0 13C0 5.8201 5.8201 0 13 0C20.1799 0 26 5.8201 26 13C26 20.1799 20.1799 26 13 26ZM11.4699 15.782L7.8754 12.1849L6.5 13.5603L10.5547 17.6176C10.7985 17.8613 11.1291 17.9982 11.4738 17.9982C11.8185 17.9982 12.1491 17.8613 12.3929 17.6176L20.1305 9.8826L18.7499 8.502L11.4699 15.782Z"
                fill="#9C78FF"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <p>{feature}</p>
        </div>
      ))}
    </>
  );
}
