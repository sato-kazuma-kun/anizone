import { Button } from "@/components/ui/button/aniflex-button";

export default function NoDataLeft() {
    return (
        <>
            <footer className="flex flex-col items-center justify-center place-contents-center mb-8" style={{ marginInline: 'var(--default-pageBorder)', }}>
                <section className="flex flex-col gap-4 items-center place-contents-center justify-center">
                    <div>
                        <h5>You&#39;ve reached the end of the page.</h5>
                    </div>

                    <div className="flex flex-row items-center justify-center place-contents-center gap-3">
                        <Button size="3" bgColor="purple" txtColor="white" linkClick="/browse-anime" disabled={null} functionClick={null}>Browse more Anime</Button>
                        <Button size="3" bgColor="purple" txtColor="white" linkClick="/view/amv" disabled={null} functionClick={null}>Browse more AMVs</Button>
                    </div>
                </section>
            </footer>
        </>
    )
}
