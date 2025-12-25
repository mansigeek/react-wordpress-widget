"use client";

import { useBuilderStore } from "@/builder/state/builder-store";
import { generateBodyClasses, generateCardClasses, generateTitleClasses } from "@/builder/utils/class-generator";

export function CardPreview() {
    const styles = useBuilderStore();

    const cardClasses = generateCardClasses(styles);
    const titleClasses = generateTitleClasses(styles);
    const bodyClasses = generateBodyClasses(styles);

    return (
        <div className={cardClasses}>
            <h4 className={titleClasses}>Card Title</h4>

            <p className={bodyClasses}>
                This is a preview card. Styles applied here will be exported exactly the same into WordPress. All styles
                are using Tailwind CSS classes for better SEO and performance.
            </p>
        </div>
    );
}
