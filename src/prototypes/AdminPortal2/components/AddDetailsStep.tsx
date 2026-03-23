import React from 'react';
import { TextInput } from '../../../components/TextInput';
import { TextArea } from '../../../components/TextArea';
import { Checkbox } from '../../../components/Checkbox';
import { formStyles as styles } from '../styles';

interface GroupDetails {
  groupName: string;
  displayName: string;
  description: string;
  allowSharing: boolean;
}

interface AddDetailsStepProps {
  data: GroupDetails;
  onChange: (data: GroupDetails) => void;
}

export const AddDetailsStep: React.FC<AddDetailsStepProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof GroupDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div>
      <div style={styles.sectionTitle}>Describe group</div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Group name</label>
        <TextInput
          value={data.groupName}
          onChange={handleChange('groupName')}
          placeholder=""
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Display name</label>
        <TextInput
          value={data.displayName}
          onChange={handleChange('displayName')}
          placeholder=""
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>
          Description <span style={styles.optionalTag}>(Optional)</span>
        </label>
        <TextArea
          value={data.description}
          onChange={handleChange('description')}
          placeholder=""
          rows={5}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
        <Checkbox
          checked={data.allowSharing}
          onChange={(checked) => onChange({ ...data, allowSharing: checked })}
        />
        <span style={{ fontSize: '14px', color: '#1D232F', fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          Allow others to share objects with this group
        </span>
      </div>
    </div>
  );
};

export default AddDetailsStep;
