import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import {Skill} from '../../utils/Skills';
import {Language} from '../../utils/Language';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../utils/Colors';

const FilterPopup = ({
  isVisible,
  onClose,
  onApplyFilter,
  selectedSkills,
  selectedLanguages,
  onSelectSkills,
  onSelectLanguages,
  getResult,
}) => {
  const [menuItems, setMenuItems] = useState([
    {id: '1', name: 'Skill'},
    {id: '2', name: 'Language'},
    {id: '3', name: 'Experience'},
  ]);
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [selectedItem, setSelectedItem] = useState('1');
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const handleSkillToggle = skill => {
    const isSelected = selectedSkills.includes(skill);
    if (isSelected) {
      onSelectSkills(selectedSkills.filter(id => id !== skill));
    } else {
      onSelectSkills([...selectedSkills, skill]);
    }
  };

  const handleLanguageToggle = language => {
    const isSelected = selectedLanguages.includes(language);
    if (isSelected) {
      onSelectLanguages(selectedLanguages.filter(id => id !== language));
    } else {
      onSelectLanguages([...selectedLanguages, language]);
    }
  };

  const handleSubmit = () => {
    getResult();
    onClose();
  };
  // console.log(selectedSkill);
  // console.log(selectedLanguage);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
      style={{
        width: '100%',
        marginLeft: 0,
        marginBottom: 0,
      }}>
      <View style={styles.popupContainer}>
        <View style={{flexDirection: 'row', flex: 0.7}}>
          <View style={styles.menuColumn}>
            {menuItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedItem(item.id)}
                  style={[
                    styles.menuItem,
                    item.id === selectedItem ? styles.selectedMenuItem : null,
                  ]}>
                  <Text style={styles.menuItemText}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.settingsColumn}>
            {/* Option 1: AGE */}
            {selectedItem === '1' && (
              <ScrollView style={styles.settingsView}>
                {Skill.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSkillToggle(item.skill)}
                    style={[
                      styles.menuItem,
                      selectedSkill.includes(item.id)
                        ? styles.selectedMenuItem
                        : null,
                    ]}>
                    <Text style={styles.menuItemText}>{item.skill}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {selectedItem === '2' && (
              <ScrollView style={styles.settingsView}>
                {Language.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleLanguageToggle(item.language)}
                    style={[
                      styles.menuItem,
                      selectedLanguage.includes(item.id)
                        ? styles.selectedMenuItem
                        : null,
                    ]}>
                    <Text style={styles.menuItemText}>{item.language}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            height: 50,
            bottom: 0,
            backgroundColor: Colors.black1,
            width: '100%',
            position: 'absolute',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 10,
            borderRadius: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              fontSize: 18,
              color: '#fff',
              fontWeight: '600',
            }}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: '80%',
    backgroundColor: '#eaeaea',
    width: '100%',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingTop: 20,
    //alignItems: 'flex-start',
    // flexDirection: 'row',
    // flex: 0.7,
  },
  filterContainer: {
    marginBottom: 20,
    width: '100%',
  },
  filterLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: '#007300',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuColumn: {
    flex: 0.4,
    flexDirection: 'column',
    borderRightColor: '#F8F8FF',
    borderRightWidth: 1,
  },
  menuItem: {
    // flex: 1,
    flex: 0,
    height: hp(8.5),
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'flex-start',
    // borderWidth:1,
  },
  selectedMenuItem: {
    backgroundColor: '#F8F8FF',
    borderLeftColor: Colors.darkPurple,
    borderLeftWidth: 5,
  },

  menuItemText: {
    marginLeft: 10,
    alignSelf: 'flex-start',
    color: Colors.grey3,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // settings column -right
  settingsColumn: {
    flex: 0.6,
    padding: 15,
  },
});

export default FilterPopup;
