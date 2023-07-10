import $api from ".";

export async function deletePrivetImage(ImageId) {
    return await $api.delete("/deletePrivetImage", {
        params: { ImageId }
    })
}