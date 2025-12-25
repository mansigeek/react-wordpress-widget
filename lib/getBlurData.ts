import { getPlaiceholder } from "plaiceholder";

export async function getBlurData(imageUrl: string) {
    const buffer = await fetch(imageUrl).then(async res => {
        return Buffer.from(await res.arrayBuffer());
    });

    const { base64 } = await getPlaiceholder(buffer);
    return base64;
}
