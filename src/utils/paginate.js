import _ from 'lodash'

export function Paginate(items, pageSize, pageId) {
    const startInde = (pageId - 1) * pageSize
    return _(items).slice(startInde).take(pageSize).value()
}
