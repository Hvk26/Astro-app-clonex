import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButtonHandler from '../../../../components/BackButtonHandler/BackButtonHandler';
import {Colors} from '../../../../utils/Colors';

const TermOfUse = () => {
  return (
    <BackButtonHandler>
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.black7,
            fontSize: 17,
            textDecorationLine: 'underline',
          }}>
          Terms & Conditions
        </Text>
        <View style={{paddingTop: 10}}>
          <Text
            style={{textAlign: 'justify', color: Colors.grey2, fontSize: 14}}>
            The Astrogini Terms and Conditions (this ‘Agreement’) are applicable
            to all users (‘you’ and every ‘Member’) who access and/or use the
            online platform for on-line advice and professional consulting
            services (‘Astrogini Astrology Platform’) available at
            www.Astrogini.com, www.Astrogini.org and/or Other B2B solutions,
            mobile applications and websites powered by{' '}
            <Text style={{fontWeight: '500', color: Colors.black8}}>
              Astrogini
            </Text>{' '}
            or{' '}
            <Text style={{fontWeight: '500', color: Colors.black8}}>
              Astrogini Services Pvt. Ltd.
            </Text>{' '}
            (each a ‘Site’ and collectively the ‘Sites’).
          </Text>
        </View>
        <View style={{paddingTop: 10}}>
          <Text
            style={{textAlign: 'justify', color: Colors.grey2, fontSize: 15}}>
            The Sites are currently owned and operated by{' '}
            <Text style={{fontWeight: '500', color: Colors.black8}}>
              Astrogini Services Pvt. Ltd.
            </Text>{' '}
            (‘Astrogini’).
          </Text>
        </View>
        <View style={{paddingTop: 10}}>
          <Text
            style={{
              color: Colors.black8,
              fontSize: 16,
              fontWeight: '500',
              textAlign: 'center',
              textDecorationLine: 'underline',
              textDecorationColor: Colors.black7,
            }}>
            UPDATION
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            Astrogini may update/amend/modify these Terms of Usage from time to
            time. The User is responsible to check the Terms of Usage
            periodically to remain in compliance with these terms.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            Astrogini reserves the right and may modify this Agreement or any
            part hereof at any time as may be required for the provision of
            services on the Sites, for complying with the legal and regulatory
            framework and for other legitimate business purposes. Astrogini will
            expend reasonable efforts to inform you of any material change to
            this Agreement. That said, you as well as every Member is encouraged
            to check the terms of this Agreement frequently. It is made
            expressly clear that by continuing to use the Astrogini Astrology
            Platform and/or the Sites (including maintaining your account) after
            any modifications have been made to this Agreement , would indicate
            your and/or the Member’s consent to be bound by such modified
            agreement.
          </Text>
        </View>

        <View style={{paddingTop: 10}}>
          <Text
            style={{
              color: Colors.black8,
              fontSize: 16,
              fontWeight: '500',
              textAlign: 'center',
              textDecorationLine: 'underline',
              textDecorationColor: Colors.black7,
            }}>
            USER CONSENT
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            By accessing the Astrogini Website/Apps and using it, you (“Member”,
            “You”, “Your”) indicate that you understand the terms and
            unconditionally & expressly consent to the Terms of Usage of the
            Website/App. If you do not agree with the Terms of Usage, please do
            not click on the “I AGREE” button during Registration/Sign-Up or at
            any part of the website/App. The User is advised to read the Terms
            of Usage carefully before using or registering on the Website/App or
            accessing any material, information or services through the
            Website/App. Your use and continued usage of the Website/App
            (irrespective of the amendments made from time to time) shall
            signify your acceptance of the terms of usage and your agreement to
            be legally bound by the same.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            The Website/App is providing certain service (Talk To Astrologer)
            which is available through the medium of telecommunication with the
            Astrologer listed and enrolled with the Website/App. By agreeing to
            the present Terms of Usage, you are also giving your unconditional
            consent to the Website/App to arrange a call with you on your mobile
            number even though your number is on DND service provided by your
            mobile service provider.
          </Text>
        </View>

        <View style={{paddingTop: 10}}>
          <Text
            style={{
              color: Colors.black8,
              fontSize: 16,
              fontWeight: '500',
              textAlign: 'center',
              textDecorationLine: 'underline',
              textDecorationColor: Colors.black7,
            }}>
            GENERAL DESCRIPTION
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            Astrogini provides a platform where an Astrology Expert may present
            his or her expertise and sell advice or services to interested
            Astrogini users.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            The Website is an internet-based portal having its existence on
            World Wide Web, Application and other electronic medium and provides
            astrological content, reports, data, telephone, video and email
            consultations (hereinafter referred as “Content”). The Website/App
            is offering “Free Services” and “Paid Services” (Collectively
            referred as “Services”). Free Services are easily accessible without
            becoming a member, however for accessing the personalised
            astrological services and/or receive additional Content and get
            access to Paid Services, You are required to register as a member on
            the Website/App/Portal. By registering for Paid Services, a Member
            agrees to :-
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            <Text style={{color: Colors.black8, fontWeight: '500'}}>1.</Text> To
            provide current, complete, and accurate information about yourself
            as prompted to do so by the Website/App.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            <Text style={{color: Colors.black8, fontWeight: '500'}}>2.</Text> To
            maintain and update the above information as required and submitted
            by you with the view to maintain the accuracy of the information
            being current and complete.
          </Text>
        </View>

        <View style={{paddingTop: 10, paddingBottom: 40}}>
          <Text
            style={{
              color: Colors.black8,
              fontSize: 16,
              fontWeight: '500',
              textAlign: 'center',
              textDecorationLine: 'underline',
              textDecorationColor: Colors.black7,
            }}>
            REGISTRATION AND ELIGIBILITY
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            By using this website, you agree that you are over the age of 18
            years and are allowed to enter into a legally binding and
            enforceable contract under Indian Contract Act, 1872. The
            Website/App would not be held responsible for any misuse that may
            occur by virtue of any person including a minor using the services
            provided through the Website/App. You are however allowed to ask
            questions related to minors in your family as per the terms and
            conditions outlined here within this policy.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            For the User to avail the services, the User will be directed to
            Register as a Member on the Website whereby You (User) agree to
            provide or update, current and accurate information while filling up
            the sign-in form. All information that you fill-up and provide to
            the Website/App and all updates thereto are referred to in these
            Terms of Usage as “Registration Data“.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            An account could be created by you through the Website ID (Your
            Phone Number) and password (OTP) or other Log-In ID and Password
            which can include a facebook, gmail or any other valid email ID. The
            User while creating an account hereby represents and warrants that
            all the information provided by the User is current, accurate and
            complete and that the User will maintain the accuracy and keep the
            information updated from time to time. Use of another User’s account
            information for availing the services is expressly prohibited. If in
            case it is found that the information so provided on the Website/App
            is inaccurate, incomplete, untrue and not current, the Website/App
            has the right to suspend or terminate the User’s account and
            restrict/refuse the use of the Website/App by such User in future.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            The right to use this Website/App is personal to the User and is not
            transferable to any other person or entity. The User would be
            responsible for protecting the confidentiality of User’s passwords
            and other information required for the purposes of registration. The
            User would be fully responsible for all the activities that occur
            under the User’s account within the Website/App. The Website/App
            cannot and will not be liable for any loss or damage arising from
            the User’s failure to maintain secrecy and confidentiality. The User
            shall notify the Website/App immediately if they become aware of any
            unauthorized use of their Account(s) or breach of any security. The
            User must Log-Out from its account at the end of every session for
            security.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            The User while availing any service shall be informed whether the
            service so rendered is personal to the Website/App or is available
            from a Third party. The Website/App shall have no control or
            monitoring on the information disseminated to any third party via
            the Website/App.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            The User agrees, understands and confirms that his/ her personal
            data including without limitation to details relating to debit card/
            credit card transmitted over the Internet may be susceptible to
            misuse, hacking, theft and/ or fraud and that the Website/App or the
            Payment Service Provider(s) have no control over such matters.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            The Website/App does not permit the use of the Services by any User
            under the following conditions :-
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            <Text style={{color: Colors.black8, fontWeight: '500'}}>1. </Text>If
            the User is a resident of any jurisdiction that may prohibit the use
            of the Services rendered by the Website/App.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            <Text style={{color: Colors.black8, fontWeight: '500'}}>2. </Text>If
            the User is a resident of any State/Country that prohibits by way of
            law, regulation, treaty or administrative act for entering into
            trade relations; or/and Due to any religious practices.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            <Text style={{color: Colors.black8, fontWeight: '500'}}>3. </Text>If
            the User has created multiple accounts using various mobile numbers.
          </Text>
          <Text
            style={{marginTop: 10, color: Colors.grey2, textAlign: 'justify'}}>
            <Text style={{color: Colors.black8, fontWeight: '500'}}>4. </Text>
            The User may not have more than one active account with the
            Website/App.
          </Text>
        </View>
      </ScrollView>
    </BackButtonHandler>
  );
};

export default TermOfUse;

const styles = StyleSheet.create({});
