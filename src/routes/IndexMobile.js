import React from 'react';
import { connect } from 'dva';
import { Range, WingBlank, WhiteSpace, createTooltip } from 'antd-mobile';
import styles from './IndexMobile.css';

function IndexMobile() {
  const RangeWithTooltip = createTooltip(Range);

  return (
    <div>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <p className={styles.title}>Range, 基础使用</p>
        <Range min={0} max={20} defaultValue={[3, 10]} />
      </WingBlank>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <p className={styles.title}>Range, 带 Tooltip</p>
        <RangeWithTooltip min={0} max={20} defaultValue={[3, 10]} />
      </WingBlank>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <p className={styles.title}>Range, 禁用</p>
        <Range min={0} max={20} defaultValue={[3, 10]} disabled />
      </WingBlank>
    </div>
  );
}

IndexMobile.propTypes = {
};

export default connect()(IndexMobile);
