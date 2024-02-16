import { revalidatePath } from "next/cache";

export const handleDelete = async (id: any) => {

    try {
        const res = await fetch("http://localhost:3000/api/deleteuser", {
            method: "DELETE",
            body: JSON.stringify({deleteid:id}),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            console.log("User Deleted successfully");
            revalidatePath("/users")
        } else {
            console.log("Oops! Something is wrong in Deleting the user.");
        }

    } catch (error) {
        console.log("Error in Deleteing the User", error);
    }
}