"use client";

import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useBuilderStore } from "@/builder/state/builder-store";
import { registerStyle } from "@/builder/utils/style-registry";
import imageLoader from "@/lib/image-loader";

const LIMIT = 10;

export function CardPreview() {
    const {
        backgroundColor,
        textColor,
        padding,
        borderRadius,
        shadow,
        showBorder,
        borderWidth,
        borderColor,
        fontFamily,
        titleFontSize,
        titleFontWeight,
        bodyFontSize,
        title,
        subtitle,
        description,
        author,
        date,
        tags,
        imageUrl,
        showImage,
        buttonText,
        buttonLink,
        showButton,
    } = useBuilderStore();

    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const skip = (page - 1) * LIMIT;
    const totalPages = Math.ceil(total / LIMIT);

    /* =======================
       FETCH PRODUCTS
    ======================== */
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get("https://dummyjson.com/products/search", {
                    params: {
                        limit: LIMIT,
                        q: search || undefined,
                        select: "title,price,thumbnail",
                        skip,
                    },
                });

                setProducts(res.data.products);
                setTotal(res.data.total);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, search]);

    /* =======================
       STYLE HELPERS
    ======================== */

    const getFontFamilyValue = () => {
        switch (fontFamily) {
            case "serif":
                return "serif";
            case "sans-serif":
                return "sans-serif";
            case "monospace":
                return "monospace";
            default:
                return "inherit";
        }
    };

    const getShadowValue = () => {
        switch (shadow) {
            case "sm":
                return "0 1px 3px rgba(0,0,0,0.1)";
            case "md":
                return "0 4px 6px rgba(0,0,0,0.15)";
            case "lg":
                return "0 10px 15px rgba(0,0,0,0.2)";
            default:
                return "none";
        }
    };

    /* =======================
       STYLES
    ======================== */

    const cardClass = registerStyle({
        backgroundColor,
        border: showBorder ? `${borderWidth}px solid ${borderColor}` : "none",
        borderRadius: `${borderRadius.value}${borderRadius.unit}`,
        boxShadow: getShadowValue(),
        color: textColor,
        fontFamily: getFontFamilyValue(),
        minWidth: "0",
        padding: `${padding.value}${padding.unit}`,
        transition: "all 200ms ease",
        width: "100%",
    });

    const imageClass = registerStyle({
        aspectRatio: "16 / 9",
        borderRadius: "8px",
        marginBottom: "1rem",
        objectFit: "cover",
        width: "100%",
    });

    const titleClass = registerStyle({
        fontSize: `${titleFontSize}px`,
        fontWeight: titleFontWeight,
        marginBottom: "0.5rem",
    });

    const bodyClass = registerStyle({
        fontSize: `${bodyFontSize}px`,
        opacity: 0.85,
    });

    const buttonClass = registerStyle({
        alignItems: "center",
        backgroundColor: textColor,
        borderRadius: "8px",
        color: backgroundColor,
        display: "inline-flex",
        fontWeight: 600,
        justifyContent: "center",
        marginTop: "1rem",
        padding: "0.75rem 1.25rem",
        textDecoration: "none",
        width: "100%",
    });

    /* =======================
       RENDER
    ======================== */

    return (
        <div
            data-widget-config={JSON.stringify({
                apiUrl: "https://dummyjson.com/products/search",
                features: {
                    pagination: true,
                    search: true,
                },
                limit: LIMIT,
                styling: {
                    buttonLink,
                    buttonText,
                    showButton,
                    showImage,
                },
            })}
            data-widget-container
        >
            {/* FILTER */}
            <input
                className="border px-3 py-2 rounded-md text-sm w-full"
                data-search-input
                onChange={e => {
                    setPage(1);
                    setSearch(e.target.value);
                }}
                placeholder="Search products..."
                type="text"
                value={search}
            />

            {/* GRID */}
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2" data-items-container>
                {loading && <p data-loading-indicator>Loading...</p>}

                {!loading &&
                    products.map(product => {
                        return (
                            <div
                                className={cardClass}
                                data-item
                                data-item-data={JSON.stringify({
                                    id: product.id,
                                    price: product.price,
                                    thumbnail: product.thumbnail,
                                    title: product.title,
                                })}
                                data-item-id={product.id}
                                key={product.id}
                            >
                                {showImage && (
                                    <Image
                                        alt={product.title}
                                        className={imageClass}
                                        data-item-image
                                        height={450}
                                        loader={imageLoader}
                                        src={product.thumbnail}
                                        width={800}
                                    />
                                )}

                                <h4 className={titleClass} data-item-title>
                                    {product.title}
                                </h4>

                                <p className={bodyClass} data-item-price>
                                    ${product.price}
                                </p>

                                {showButton && buttonText && (
                                    <a className={buttonClass} data-item-button href={buttonLink}>
                                        {buttonText}
                                    </a>
                                )}
                            </div>
                        );
                    })}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div
                    className="flex gap-4 items-center justify-center"
                    data-current-page={page}
                    data-pagination-container
                    data-total-pages={totalPages}
                >
                    <button
                        className="border disabled:opacity-50 flex gap-1 items-center px-3 py-1 rounded-sm text-sm"
                        data-pagination-prev
                        disabled={page === 1}
                        onClick={() => {
                            return setPage(p => {
                                return Math.max(1, p - 1);
                            });
                        }}
                    >
                        <ChevronLeft size={16} /> Prev
                    </button>

                    <span className="text-sm" data-pagination-info>
                        Page {page} of {totalPages}
                    </span>

                    <button
                        className="border disabled:opacity-50 flex gap-1 items-center px-3 py-1 rounded-sm text-sm"
                        data-pagination-next
                        disabled={page === totalPages}
                        onClick={() => {
                            return setPage(p => {
                                return Math.min(totalPages, p + 1);
                            });
                        }}
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
