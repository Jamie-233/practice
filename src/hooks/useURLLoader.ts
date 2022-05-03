import {ref} from 'vue'
import axios from 'axios'

function useURLLoader<T>(url: string) {
    const result = ref<T | null>(null)
    const loading = ref(true)
    const loaded = ref(false)
    const error= ref(null)

    axios.get(url).then((rowData) => {
        loading.value = false
        result.value = rowData.data
        loaded.value = true
    })
    .catch((err) => {
        error.value = err
        loading.value = false
    })

    return {
        result,
        loaded,
        loading,
        error,
    }
}

export default useURLLoader