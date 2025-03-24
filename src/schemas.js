import yup from "yup"


export const blogSchema = yup.object({
    id: yup.number().optional(),
    author: yup.string().optional(),
    url: yup.string().required("The url must be givven"),
    title: yup.string().required("There must be a title"),
    likes: yup.number().default(0)
})