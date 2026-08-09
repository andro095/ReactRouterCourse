import type { Route } from "./+types/product"
import { Link } from "react-router"
import { ArrowLeft, Package, ShieldCheck, ShoppingBag, Sparkles, Star, Tag } from "lucide-react"

export async function loader({ params }: Route.LoaderArgs) {
    const { name } = params

    if (!name) {
        return {
            name: "UNKNOWN PRODUCT",
            formattedName: "Unknown Product"
        }
    }

    const cleanName = name.replaceAll("-", " ")

    return {
        name: name.toUpperCase(),
        formattedName: cleanName.toUpperCase()
    }
}

const ProductPage = ({ loaderData }: Route.ComponentProps) => {
    if (!loaderData?.name) {
        return (
            <div 
                className="flex min-h-screen items-center justify-center p-6 text-muted-foreground bg-background"
                tabIndex={0}
                role="region"
                aria-label="Product not found"
            >
                <span>Product details unavailable</span>
            </div>
        )
    }

    const { name, formattedName } = loaderData

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            // Accessible keyboard interaction container
        }
    }

    const handleAddToCart = () => {
        // Handle add to cart action
    }

    return (
        <div 
            className="flex min-h-screen flex-col items-center justify-center p-6 bg-background relative overflow-hidden"
            tabIndex={0}
            role="region"
            aria-label={`Product view for ${formattedName}`}
            onKeyDown={handleKeyDown}
        >
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="max-w-xl w-full flex flex-col gap-6 p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-border">
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <Link 
                        to="/chat" 
                        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Back to chat overview"
                    >
                        <ArrowLeft className="h-4 w-4 text-primary" />
                        <span>Back to Chat</span>
                    </Link>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Featured Item</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5 shrink-0">
                        <Package className="h-8 w-8 stroke-[1.5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <Tag className="h-3.5 w-3.5" />
                            <span>CODE: {name}</span>
                        </div>
                        <h1 
                            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground"
                            aria-label={`Product name: ${formattedName}`}
                        >
                            {formattedName}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div 
                        className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border border-border/30"
                        tabIndex={0}
                        aria-label="Verified authentic product"
                    >
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span className="text-xs font-medium text-foreground">Verified Authentic</span>
                    </div>
                    <div 
                        className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border border-border/30"
                        tabIndex={0}
                        aria-label="Rating 4.9 stars out of 5"
                    >
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-medium text-foreground">4.9 Rating</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    <button 
                        type="button"
                        onClick={handleAddToCart}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-all hover:bg-primary/90 shadow-md active:scale-[0.98] cursor-pointer"
                        aria-label={`Add ${formattedName} to cart`}
                    >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage