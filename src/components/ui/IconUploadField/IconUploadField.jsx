import React, { useEffect, useState } from 'react';
import { Button, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Resizer from 'react-image-file-resizer';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {notifier} from "utils/notifier";
import {getImageUrl} from "utils/formaters";
const UploadIcon = ({ form, name,
                        maxWidth=300,
                        maxHeight=300,
                        minWidth = 30,
                        minHeight =30,
                        aspectRatio,
                        imageUrl,
                        setImageUrl
}) => {
  const [cropper, setCropper] = useState();
  const [showCropper, setShowCropper] = useState(false);
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notifier({ description: 'You can only upload JPG/PNG file!', type: 'error' });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notifier({ description: 'Image must smaller than 2MB!', type: 'error' });
    }
    if (isJpgOrPng && isLt2M) {
      getBase64(file, (imageUrl) => setImageUrl(imageUrl));
      setShowCropper(true);
    }
    return isJpgOrPng && isLt2M;
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
          maxWidth,
        maxHeight,
        'PNG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'blob'
      );
    });

  const cropImageHandler = async () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(
        async (blob) => {
          const img = await resizeFile(blob);
          console.log(img)
            getBase64(img, (imageUrl) => setImageUrl(imageUrl));
          form.setFieldsValue({ [name]: img });
        },
        'image/png',
        0.9,

      );
    }
    setShowCropper(false);
  };
  const uploadButton = (
    <div>
      <span className="icon-ic_save"/>
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );
  return (
    <>
      <Upload
        accept="image/png, image/jpeg"
        maxCount={1}
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <Modal
        title={`Crop image`}
        visible={showCropper}
        onCancel={() => setShowCropper(false)}
        footer={[
          <div>
            <Button key="submit" htmlType="submit" onClick={cropImageHandler}>
              Save
            </Button>
            <Button key="submit" onClick={() => setShowCropper(false)}>
              Cancel
            </Button>
          </div>,
        ]}
      >
        <Cropper
          style={{ height: '80%', width: '100%' }}
          initialAspectRatio={1}
          aspectRatio={aspectRatio}
          src={imageUrl}
          viewMode={1}
          minCropBoxHeight={minHeight}
          minCropBoxWidth={minWidth}
          background={false}
          responsive={false}
          autoCropArea={0.8}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={false}
          dragMode="move"
        />
      </Modal>
    </>
  );
};
export default UploadIcon;
