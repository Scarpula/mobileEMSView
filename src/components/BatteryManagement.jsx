import React, { useState } from 'react'
import './CommonStyles.css'

const BatteryManagement = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const batteryData = [
        { id: "B0001", name: "이동형배터리-01", soc: 85, status: "정상" },
        { id: "B0002", name: "이동형배터리-02", soc: 72, status: "정상" },
        { id: "B0003", name: "이동형배터리-03", soc: 45, status: "충전필요" },
        { id: "B0004", name: "이동형배터리-04", soc: 93, status: "정상" },
        { id: "B0005", name: "이동형배터리-05", soc: 28, status: "충전필요" },
        { id: "B0006", name: "이동형배터리-06", soc: 67, status: "정상" },
        { id: "B0007", name: "이동형배터리-07", soc: 88, status: "정상" },
        { id: "B0008", name: "이동형배터리-08", soc: 52, status: "점검필요" },
        { id: "B0009", name: "이동형배터리-09", soc: 76, status: "정상" },
        { id: "B0010", name: "이동형배터리-10", soc: 31, status: "충전필요" },
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = batteryData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(batteryData.length / itemsPerPage)

    const handleEdit = (id) => {
        console.log(`Editing battery with ID: ${id}`)
    }
    
    const handleDelete = (id) => {
        console.log(`Deleting battery with ID: ${id}`)
    }

    return (
        <div className='content-container'>
            <div className='card navbar'>
                <div className='nav-title'>
                    <i className='fas fa-battery-full'></i>
                    <span>이동형 배터리 관리</span>
                    <button 
                        className="sidebar-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <div className='nav-account'>
                    <div class='round admin'>
                        <span style={{ fontSize : '20px' , fontWeight: '700', color: 'white' }}>관</span>
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='card table-container'>
                    <div className='table-wrapper'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>배터리 이름</th>
                                    <th>SOC (%)</th>
                                    <th>현재 상태</th>
                                    <th>수정</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((battery) => (
                                    <tr key={battery.id}>
                                        <td>{battery.id}</td>
                                        <td>{battery.name}</td>
                                        <td>{battery.soc}%</td>
                                        <td>{battery.status}</td>
                                        <td>
                                            <button className='action-button edit' onClick={() => handleEdit(battery.id)}>수정</button>
                                        </td>
                                        <td>
                                            <button className='action-button delete' onClick={() => handleDelete(battery.id)}>삭제</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            이전
                        </button>
                        <span className="page-info">{currentPage} / {totalPages}</span>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            다음
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BatteryManagement