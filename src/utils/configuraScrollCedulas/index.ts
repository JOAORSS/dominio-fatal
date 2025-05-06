export default function configuraScrollDasCedulas() {
    const tds = document.querySelectorAll("td");
    const onWheelHandlers: { td: Element; handler: (e: WheelEvent) => void }[] = [];

    tds.forEach((td) => {
    if (td.scrollWidth > td.clientWidth) {
        const onWheel = (e: WheelEvent): void => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            td.scrollLeft += e.deltaY;
        }
        };

        td.addEventListener("wheel", onWheel, { passive: false });
        onWheelHandlers.push({ td, handler: onWheel });
    }
    });

    return () => {
    onWheelHandlers.forEach(({ td, handler }) => {
        td.removeEventListener("wheel", handler as EventListener);
    });
    };
}