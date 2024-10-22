import React from 'react';
import { 
  CheckOutlined, 
  ReconciliationOutlined, 
  TrophyOutlined, 
  WechatWorkOutlined 
} from '@ant-design/icons';

function ServiceLines() {
  return (
    <div className="bg-[#FFF3E3] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          <div className="flex items-center">
            <TrophyOutlined style={{ fontSize: 40 }} className="mr-4" />
            <div>
              <h1 className="font-bold text-lg">High Quality</h1>
              <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>

          
          <div className="flex items-center">
            <CheckOutlined style={{ fontSize: 40 }} className="mr-4" />
            <div>
              <h1 className="font-bold text-lg">Warranty Protection</h1>
              <p className="text-gray-600">Lorem ipsum dolor sit.</p>
            </div>
          </div>

          
          <div className="flex items-center">
            <ReconciliationOutlined style={{ fontSize: 40 }} className="mr-4" />
            <div>
              <h1 className="font-bold text-lg">Free Shipping</h1>
              <p className="text-gray-600">Lorem ipsum dolor amet.</p>
            </div>
          </div>

          
          <div className="flex items-center">
            <WechatWorkOutlined style={{ fontSize: 40 }} className="mr-4" />
            <div>
              <h1 className="font-bold text-lg">24 / 7 Support</h1>
              <p className="text-gray-600">Lorem ipsum dolor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceLines;
