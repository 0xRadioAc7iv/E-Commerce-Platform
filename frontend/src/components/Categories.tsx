import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Electronics", icon: "🖥️" },
  { name: "Clothing", icon: "👕" },
  { name: "Home", icon: "🏠" },
  { name: "Beauty", icon: "💄" },
];

export default function Categories() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <a
              href={`/category/${category.name.toLowerCase()}`}
              key={category.name}
            >
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4 flex flex-col items-center">
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <h3 className="text-lg font-semibold text-center">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
