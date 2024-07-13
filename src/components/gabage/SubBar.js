import React from 'react'
import { SearchBox } from './SearchBox'
import Button from '@/components/common/Button'

const SubBar = ({ handlePlaceSelect, clickCurrentLocation }) => {
    return (
        <div className="flex w-full py-2 mx-4 space-x-10 items-center ">
            <div className="flex-col basis-1/4">
                <p>地名で検索</p>
                <div className="flex">
                    <SearchBox onPlaceSelect={handlePlaceSelect} />
                    {/* <Button
                        type={'submit'}
                        buttonName={'周辺情報を取得'}
                        className={'m-2'}
                    /> */}
                </div>
            </div>

            <div className="flex-col basis-1/4">
                <p>現在地から検索</p>
                <Button
                    type={'submit'}
                    buttonName={'現在地を取得'}
                    className={'m-2'}
                    onClick={clickCurrentLocation}
                />
            </div>
        </div>
    )
}
export default SubBar
