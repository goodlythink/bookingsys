import { ReactTableDefaults } from 'react-table';

const reactTableDefaults = () => Object.assign(ReactTableDefaults, {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 25, 50],
    previousText: 'ก่อนหน้า',
    nextText: 'ถัดไป',
    loadingText: 'กำลังประมวลผล...',
    noDataText: '=== ไม่พบข้อมูล ===',
    pageText: 'หน้า',
    ofText: 'จาก',
    rowsText: 'แถว',
})

export default reactTableDefaults;